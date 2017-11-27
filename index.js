const Twitter = require('twitter');
const Scanner = require('./Scanner.js')
const Configs = require('./Configs.json');
var client = new Twitter(Configs.tokens)

client.stream('user',(stream)=>{
	stream.on('data',(data)=>{
		if(data.in_reply_to_user_id_str){return}
		if(data.user.screen_name!=Configs.userName){return}
		var flag = false;
		Scanner.forEach((s)=>{
			var reg = new RegExp(s,'g');
			if(reg.test(data.text)){
				data.text = data.text.replace(reg,'にゃん');
				flag = true;
			}
		})
		if(flag){
			data.text = 'にゃんにゃんフィルター発動！！\n' + data.text;
			client.post(`statuses/destroy`,{id:data.id_str})
			client.post('statuses/update',{
				status:data.text
			})
		}
	})
})