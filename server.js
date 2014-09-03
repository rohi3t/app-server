var express = require('express'),
app = express(),
cons = require('consolidate')
router = require('router');

app.engine('html',cons.swig);
app.set('view engine','html');
app.set('Views',__dirname+'/views');

app.use(router());

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

function errorHandler(err,req,res,next){
	console.error(err.message);
	console.error(err.stack);
	res.status(500);
	res.render('error_template',
		{
			error:err
		}
	);
	res.end();
}
app.use(errorHandler);
app.get('/',function(req,res,next){
	console.log('\nget methord called!\n');
	res.render('fruit_picker',{
		'fruits':['apple','orange','banna','peach']
	});
	res.end();
});

app.post('/favorite_fruit',function(req,res,next){
	console.log('post methord called!\n');
	var favorite = req.body.fruit;
	if(typeof favorite=='undefined'){
		next(Error('please choose a fruit'));
	}
	else{
		res.send("your favorite fruit is "+favorite);
	}
});

app.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", server_port " + server_port );
});