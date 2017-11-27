const Twitter = require('twitter');
const Scanner = require('./Scanner.js')
var client = new Twitter({
	consumer_key:'oknbVRDJruiH9awtBHvMUo7IX',
	consumer_secret:'KWNDC0FMS85O8qe7Cd9utO0eu4N9TLrxHyb1NGozUGcsrp7nkT',
	access_token_key:'1965603450-0azP0BTp5Q6HNsmCkgdYjWdoCEXwwuCj7ZjsyD4',
	access_token_secret:'UFFrVv89DCjDklTWpfWy1wVbNef3c5AGgUudPB0mXBYFm'
})

client.stream('user',(stream)=>{
	stream.on('data',(data)=>{
		if(data.in_reply_to_user_id_str){return}
		if(data.user.screen_name!='eakonnsamui'){return}
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