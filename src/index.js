var http = require('http');
var querystring = require('querystring');
var response_code = require('./response_code.json')

var SMSru = function(){
	this.params = [];
	if(arguments.length==2){
		this.params['login'] = arguments[0];
		this.params['password'] = arguments[1];
	}else{
		this.params['api_id'] = arguments[0];
	}
}


SMSru.prototype = {
	sms_send: function(options, callback){
		var params = {};

		if(options.multi)for(var i=0; i<options.multi.length; i++){
			params['multi[' + options.multi[i][0]+']'] = options.multi[i][1];
		}

		if(options.from)params.from = options.from;
		if(options.to)params.to = options.to;
		if(options.text)params.text = options.text;
		if(options.time && options.time < ( Math.ceil(+new Date()/1000) + 7 * 60 * 60 * 24 ))params.time = options.time;
		if(options.translit)params.translit = 1;
		if(options.test)params.test = 1;
		if(options.partner_id)params['partner_id'] = options.partner_id;

		this.get('sms/send', params, callback, ['ids']);
	},

	sms_status: function(id, callback){
		this.get('sms/status', {id:id}, callback);
	},

	sms_cost: function(options, callback){
		this.get('sms/cost', options, callback, ['price', 'number']);
	},

	my_balance: function(callback){
		this.get('my/balance', {}, callback, ['balance']);
	},

	my_limit: function(callback){
		this.get('my/limit', {}, callback, ['total', 'current']);
	},

	my_senders: function(callback){
		this.get('my/senders', {}, callback, 'senders');
	},

	stoplist_add: function(options, callback){
		this.get('stoplist/add', {
			stoplist_phone: options.phone,
			stoplist_text: options.text
		}, callback);
	},

	stoplist_del: function(options, callback){
		this.get('stoplist/del', {
			stoplist_phone: options.phone
		}, callback);
	},

	stoplist_get: function(callback){
		this.get('stoplist/get', {}, callback, 'stoplist');
	},

	sms_ucs: function(callback){
		this.get('sms/ucs', {}, callback);
	},

	get: function(path, params, callback, properties_name){
		for(var key in this.params)params[key] = this.params[key]
		http.get('http://sms.ru/'+path+'?'+querystring.stringify(params), function(res) {
			var result = '';
			res.on("data", function(data){result+=data});
			res.on('end', function(){if(result){
				result = result.replace(/\n+$/,'').split('\n');
				var response = {};
				response['code'] = result[0];
				response['description'] = response_code[path.split('/')[1]][result[0]];
				result.shift();

				if(typeof properties_name === 'string')response[properties_name] = [];
				result.forEach(function(id){
					if (!~id.search(/=/)){
						typeof properties_name === 'string'? response[properties_name].push(id): response[properties_name.shift()] = id;
					}else{
						var result = id.split('=');
						response[result[0]] = result[1];
					}
				})
				callback(response);
			}});
		}).on('error', function(e) {
		  console.log("Error: " + e.message);
		});
	},
}


module.exports = SMSru;