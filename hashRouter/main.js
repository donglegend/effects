/**
 * Created By dongsheng/donglegend
 */
;(function (win){
	var HashRoute = (function (){
		function HashRoute(){
			throw 'HashRoute cannot be instantiated';
		}


		var p = {
			ROUTES: {},
			maps: function (ops){
				var R = this.ROUTES;
				for(var k in ops){
					if(ops.hasOwnProperty(k)){
						if(typeof ops[k] !== "function"){
							throw new Error("init HashRoute instance error, maybe "+k+"is not a function!");
						}

						var u = this.formatPath(k);
						if(R[u]){
							R[u].push(ops[k])
						}else{
							R[u] = [ops[k]];
						}
					}
				}
				return this;
			},

			formatPath: function (path){
				var path = path.replace(/^#*/, "");
				if(!path){
					throw new Error("first params should be a path, string type!");
				}
				return path;
			},

			add: function (path, cb){
				var path = this.formatPath(path);
				if(typeof cb !== "function"){
					throw new Error("error, maybe second params is not a function!");
				}
				if(this.ROUTES[path]){
					this.ROUTES[path].push(cb);
				}else{
					this.ROUTES[path] = [cb];
				}
				return this;
			},

			remove: function (path){
				var path = this.formatPath(path);
				this.ROUTES[path] && delete this.ROUTES[path];
				return this;
			},

			clear: function (){
				this.ROUTES = {};
				return this;
			},

			go: function (path){
				var path = this.formatPath(path);
				win.location.hash = path;
				return this;
			},
			redirect: function (p){
				this.go(p);
				return this;
			},
			handler: function (path){
				var path = this.formatPath(path);
				if(!this.ROUTES[path]){
					return console.warn("this is no method to handler path!")
				}
				for(var i = 0,len=this.ROUTES[path].length; i<len; i++){
					this.ROUTES[path][i].apply(this, arguments)
				}
			}

		}

		for(var k in p){
			HashRoute[k] = p[k];
		}

		return HashRoute;
	})();


	win.onhashchange = function (){
		HashRoute.handler(location.hash)
	}
	win.HashRoute = HashRoute;
})(window)

