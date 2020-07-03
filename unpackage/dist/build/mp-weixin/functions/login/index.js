// 云函数入口文件
const cloud = require('wx-server-sdk')
const superagent = require('superagent')
const crypto = require('crypto');


cloud.init()
const db = cloud.database()
const user = db.collection('user')
const decodeway = (session_key,info)=>{
	let sessionKey = Buffer.from(session_key, 'base64'),
		encryptedData = Buffer.from(info.encryptedData, 'base64'),
		iv = Buffer.from(info.iv, 'base64');
	let decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv);
	decipher.setAutoPadding(true);
	let decoded = decipher.update(encryptedData, 'binary', 'utf8');
	decoded += decipher.final('utf8');
	decoded = JSON.parse(decoded);
}

// 云函数入口函数
exports.main = async (event, context) => {
	try{
		let code = event.code,
			info = event.info,
			appid = 'wx0957e9b0b1f78f0a',
			secret = '24777e77b59fd3dc674fbe1129aa8ebc';
		if(!code){return {code: 500,msg:"没有code"}};
		return new Promise((resolve, reject) => {
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
				// let decoded = decodeway(session_key,info);
				let decoded = '';
				//存入数据
				let time = Date.parse(new Date());
				console.log(decoded,time,openid);
				user.where({
					openid: openid, 
				}).get().then(res => {
					if(res.data.length > 0){
						user.where({
							openid: openid, 
						}).update({
							data:{
								info:decoded,
								openid:openid,
								session_key:session_key,
								time:time
							}
						})
					}else{
						user.add({
							data:{
								info:decoded,
								openid:openid,
								session_key:session_key,
								time:time
							}
						})
					}
					resolve({
						code: 200,
						msg: 'ok',
						err:'成功？？？？？？',
						time:time
					})
				}).catch(err => {
					console.log(err);
					resolve({
						code: 500,
						msg: 'ok?',
						err:err
					})
				});
		    	
		    }).catch((err)=>{
		    	resolve({
		    		code: 500,
		    		msg: '请求微信连接失败',
					err:err.message,
					errsta:err.stack
		    	})
		    });
		})
		
	}catch(e){
		console.log(e)
	}
	
}