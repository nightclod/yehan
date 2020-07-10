const cloud = require('wx-server-sdk')//数据库
const superagent = require('superagent')//访问外部链接
const crypto = require('crypto');//解密

//数据库
cloud.init()
const db = cloud.database()
const user = db.collection('user')
const user_wx = db.collection('user_wx')
//解密
const decodeway = (session_key,data,ivdata)=>{
	let sessionKey = Buffer.from(session_key, 'base64'),
		encryptedData = Buffer.from(data, 'base64'),
		iv = Buffer.from(ivdata, 'base64');
	let decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv);
	decipher.setAutoPadding(true);
	let decoded = decipher.update(encryptedData, 'binary', 'utf8');
	decoded += decipher.final('utf8');
	decoded = JSON.parse(decoded);
	return decoded
}
//数据库获取id
const userid = function(data,cd,cdk,wxdata){
	user.where({
		phone: data, 
	}).get().then(res => {
		if(res.data.length > 0){
			cd && cd(res.data[0]["_id"])
		}else{
			user.add({
				data:{
					phone:data,
					name:wxdata ? wxdata.nickName : "用户"+ Date.parse(new Date()),
					headpic:wxdata ? wxdata.avatarUrl : "../../static/img/name.jpg",
					time:Date.parse(new Date()),
					openid:wxdata ? wxdata.openid : "",
					session_key:wxdata ? wxdata.session_key : ""
				}
			}).then(()=>{
				user.where({
					phone: data, 
				}).get().then(res=>{
					cd && cd(res.data[0]["_id"])
				})
			})
		}
	}).catch(err => {
		cdk && cdk(err);
	});
}

// 云函数入口函数
exports.main = async (event, context) => {
	try{
		return new Promise((resolve, reject) => {
			let phone = event.phone;
			if(phone === ""){
				let code = event.code || "",
					phonedata = event.phonedata || "",
					phoneiv = event.phoneiv || "",
					wxdata = event.wxdata,
					appid = 'wx0957e9b0b1f78f0a',
					secret = '24777e77b59fd3dc674fbe1129aa8ebc';
				superagent.get('https://api.weixin.qq.com/sns/jscode2session').query({
					appid:appid,
					secret:secret,
					js_code:code,
					grant_type:'authorization_code'
				}).then((res)=>{
					let data = JSON.parse(res.text);
					let openid = data.openid,
						session_key = data.session_key;
					//解密信息
					if(phonedata !== ""){
						phone = decodeway(session_key,phonedata,phoneiv);
					}
					//存入数据
					if(phone !== ""){
						userid(phone,(id)=>{
							resolve({
								code: 200,
								msg: 'ok',
								id: id
							})
						},(err)=>{
							resolve({
								code: 500,
								msg: err
							})
						},{
							openid:openid,
							session_key:session_key,
							avatarUrl:wxdata.avatarUrl,
							nickName:wxdata.nickName
						});
					}else{
						user.where({
							openid: openid, 
						}).get().then(res => {
							if(res.data.length > 0){
								user.where({
									openid: openid, 
								}).update({
									data:{
										session_key:session_key
									}
								}).then(()=>{
									resolve({
										code: 200,
										msg: 'ok',
										id: res.data[0]["_id"]
									})
								}).catch(err=>{
									resolve({
										code: 500,
										msg: err
									})
								})
							}else{
								user.add({
									data:{
										openid:openid,
										session_key:session_key,
										phone:"",
										name:wxdata.nickName,
										headpic:wxdata.avatarUrl,
										time:Date.parse(new Date())
									}
								}).then(()=>{
									user.where({
										openid: openid, 
									}).get().then(res=>{
										resolve({
											code: 200,
											msg: 'ok',
											id: res.data[0]["_id"]
										})
									}).catch(err=>{
										resolve({
											code: 500,
											msg: err
										})
									})
								})
							}
						}).catch(err => {
							resolve({
								code: 500,
								msg: err
							})
						});
					}
				}).catch((err)=>{
					resolve({
						code: 500,
						msg: '请求微信连接失败'+ err
					})
				});
			}else{
				userid(phone,(id)=>{
					resolve({
						code: 200,
						msg: 'ok',
						id: id
					})
				},(err)=>{
					resolve({
						code: 500,
						msg: err
					})
				})
			}
		});	
	}catch(err){
		console.log(err)
	}
}