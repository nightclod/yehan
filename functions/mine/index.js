const cloud = require('wx-server-sdk')//数据库

//数据库
cloud.init()
const db = cloud.database()
const user = db.collection('user')

// 云函数入口函数
exports.main = async (event, context) => {
	try{
		return new Promise((resolve, reject) => {
			let id = event.id;
			user.where({
				_id: id, 
			}).get().then(res => {
				if(res.data.length > 0){
					resolve({
						code: 200,
						msg: 'ok',
						data: {
							name:res.data[0].name,
							phone:res.data[0].phone,
							picture:res.data[0].headpic
						}
					})
				}else{
					resolve({
						code: 202,
						msg: "没有找到此账号"
					})
				}
			}).catch(err => {
				resolve({
					code: 500,
					msg: err
				})
			});
		});	
	}catch(err){
		console.log(err)
	}
}