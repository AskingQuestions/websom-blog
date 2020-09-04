//Relative RichEntity
//Relative Module
//Relative Post
//Relative Archive
//Relative Module
//Relative User
//Relative Login
//Relative Connection
//Relative Module
//Relative Order
//Relative Product
//Relative Cart
//Relative ShippingClass
//Relative ShippingZone
//Relative CoreModule
Blog = function () {var _c_this = this;


}

Blog.Module = function (server) {var _c_this = this;
	this.postsPermission = null;

	this.postsView = null;

	this.server = null;

	this.baseConfig = null;

	this.containers = [];

	this.bridges = [];

	this.registeredCollections = [];

	this.registeredPermissions = [];

	this.registeredBuckets = [];

	this.name = "";

	this.id = "";

	this.root = "";

	this.version = "";

	this.author = "";

	this.license = "";

	this.repo = "";

	this.posts = null;

	this.archives = null;

		_c_this.server = server;
		_c_this.registerWithServer();
}

/*i async*/Blog.Module.prototype.start = async function () {var _c_this = this; var _c_root_method_arguments = arguments;
}

Blog.Module.prototype.permissions = function () {var _c_this = this; var _c_root_method_arguments = arguments;
		_c_this.postsPermission = _c_this.registerPermission("Posts.Admin").setDescription("Posts admin permission.");
		_c_this.postsView = _c_this.registerPermission("Posts.View").isPublic().setDescription("Public posts permission.");}

/*i async*/Blog.Module.prototype.collections = async function () {var _c_this = this; var _c_root_method_arguments = arguments;
/*async*/
		var db = _c_this.server.database.central;
		_c_this.posts = db.collection("posts");
		Blog.Post.applySchema(_c_this.posts);
		(await _c_this.registerCollection/* async call */(_c_this.posts));
		_c_this.archives = db.collection("archives");
		Blog.Archive.applySchema(_c_this.archives);
		(await _c_this.registerCollection/* async call */(_c_this.archives));
		_c_this.server.api.generateAdminEndpoints(_c_this.posts, "/posts", _c_this.postsPermission).exposeSchemaTo(_c_this.postsPermission).generateSearchEndpoint([], _c_this.postsView);}

Blog.Module.prototype.registerWithServer = function () {var _c_this = this; var _c_root_method_arguments = arguments;
}

Blog.Module.prototype.clientData = function (req, send) {var _c_this = this; var _c_root_method_arguments = arguments;
		return false;}

Blog.Module.prototype.spawn = function (config) {var _c_this = this; var _c_root_method_arguments = arguments;
		_c_this.baseConfig = config;
		_c_this.name = config["name"];
		_c_this.id = config["id"];}

Blog.Module.prototype.stop = function () {var _c_this = this; var _c_root_method_arguments = arguments;
}

Blog.Module.prototype.configure = function () {var _c_this = this; var _c_root_method_arguments = arguments;
}

/*i async*/Blog.Module.prototype.registerCollection = async function (collection) {var _c_this = this; var _c_root_method_arguments = arguments;
/*async*/
		_c_this.registeredCollections.push(collection);
		if (_c_this.server.config.dev) {
/*async*/
			if (collection.appliedSchema != null) {
/*async*/
				(await collection.appliedSchema.register/* async call */());
				}
			}}

Blog.Module.prototype.registerPermission = function () {var _c_this = this; var _c_root_method_arguments = arguments;
	if (arguments.length == 1 && ((arguments[0] instanceof Websom.Permission) || typeof arguments[0] == 'undefined' || arguments[0] === null)) {
		var permission = arguments[0];
		_c_this.registeredPermissions.push(permission);
	}
else 	if (arguments.length == 1 && (typeof arguments[0] == 'string' || typeof arguments[0] == 'undefined' || arguments[0] === null)) {
		var permission = arguments[0];
		var perm = new Websom.Permission(permission);
		_c_this.registeredPermissions.push(perm);
		return perm;
	}
}

Blog.Module.prototype.registerBucket = function (name) {var _c_this = this; var _c_root_method_arguments = arguments;
		var bucket = new Websom.Bucket(_c_this.server, name, _c_this.name);
		_c_this.registeredBuckets.push(bucket);
		_c_this.server.registerBucket(bucket);
		return bucket;}

Blog.Module.prototype.setupData = function () {var _c_this = this; var _c_root_method_arguments = arguments;
}

Blog.Module.prototype.setupBridge = function () {var _c_this = this; var _c_root_method_arguments = arguments;
}

Blog.Module.prototype.pullFromGlobalScope = function (name) {var _c_this = this; var _c_root_method_arguments = arguments;
		
			return global[name];
		}

Blog.Module.prototype.setupBridges = function () {var _c_this = this; var _c_root_method_arguments = arguments;
		var bridges = [];
		return bridges;}

//Relative Carbon
//Relative Context
//Relative Error
//Relative FileSystem
//Relative Buffer
//Relative File
//Relative Stat
//Relative primitive
//Relative object
//Relative array
//Relative bool
//Relative byte
//Relative char
//Relative Console
//Relative everything
//Relative Exception
//Relative float
//Relative function
//Relative int
//Relative uint
//Relative uint8
//Relative int8
//Relative uint16
//Relative int16
//Relative uint32
//Relative int32
//Relative uint64
//Relative int64
//Relative map
//Relative null
//Relative empty
//Relative void
//Relative string
//Relative Math
Blog.Archive = function () {var _c_this = this;
	this.rawFields = null;

	this.collection = null;

	this.id = "";

	this.year = "";

	this.month = "";

	this.count = 0;


}

/*i async*/Blog.Archive.prototype.load = async function () {var _c_this = this; var _c_root_method_arguments = arguments;
/*async*/
		var doc = (await _c_this.collection.document/* async call */(_c_this.id));
		(await _c_this.loadFromMap/* async call */(doc.data()));}

/*i async*/Blog.Archive.prototype.loadEntityArray = async function (arr) {var _c_this = this; var _c_root_method_arguments = arguments;
/*async*/
		if (arr.length > 0) {
/*async*/
			var collection = arr[0].collection;
			var ids = [];
			for (var i = 0; i < arr.length; i++) {
				ids.push(arr[i].id);
				}
			var docs = (await collection.getAll/* async call */(ids));
			for (var i = 0; i < docs.length; i++) {
/*async*/
				var doc = docs[i];
				var entity = arr.find(function (ent) {
					return ent.id == doc.id;
					});
				(await entity.loadFromMap/* async call */(doc.data()));
				}
			}}

Blog.Archive.applySchema = function (collection) {var _c_this = this; var _c_root_method_arguments = arguments;
		_c_this.linkToCollection(collection);
		
			return this.getSchema(collection);
		
		}

Blog.Archive.linkToCollection = function (collection) {var _c_this = this; var _c_root_method_arguments = arguments;
		
			collection.entityTemplate = this;
		
		}

Blog.Archive.prototype.getFieldValue = function (field) {var _c_this = this; var _c_root_method_arguments = arguments;
		
			let camel = field[0].toUpperCase() + field.substr(1, field.length);

			if (this["save" + camel]) {
				return this["save" + camel](this[field]);
			}else{
				return this[field];
			}
		
		}

Blog.Archive.prototype.getFieldsChanged = function () {var _c_this = this; var _c_root_method_arguments = arguments;
		var fieldsChanged = [];
		for (var i = 0; i < _c_this.collection.appliedSchema.fields.length; i++) {
			var field = _c_this.collection.appliedSchema.fields[i];
			var realValue = null;
			var myValue = _c_this.getFieldValue(field.name);
			var rawValue = null;
			if (_c_this.rawFields != null) {
				rawValue = _c_this.rawFields[field.name];
				}
			var isDifferent = false;
			if (field.type == "time") {
				var cast = myValue;
				if (cast == null) {
					realValue = null;
					}else{
						realValue = cast.timestamp;
					}
				isDifferent = realValue != rawValue;
				}else if (field.type == "reference") {
				var cast = myValue;
				if (cast != null) {
					realValue = cast.id;
					}
				isDifferent = realValue != rawValue;
				}else if (field.type == "array") {
				
					isDifferent = JSON.stringify(myValue) != JSON.stringify(rawValue);
				
				
				}else{
					realValue = myValue;
					isDifferent = realValue != rawValue;
				}
			if (isDifferent) {
				fieldsChanged.push(field);
				}
			}
		return fieldsChanged;}

/*i async*/Blog.Archive.prototype.saveToCollection = async function () {var _c_this = this; var _c_root_method_arguments = arguments;
/*async*/
		var fields = _c_this.getFieldsChanged();
		var update = _c_this.collection.update().where("id", "==", _c_this.id);
		for (var i = 0; i < fields.length; i++) {
			var field = fields[i];
			update.set(field.name, _c_this.getFieldValue(field.name));
			}
		return (await update.run/* async call */());}

/*i async*/Blog.Archive.prototype.insertIntoCollection = async function () {var _c_this = this; var _c_root_method_arguments = arguments;
/*async*/
		var fields = _c_this.getFieldsChanged();
		var insert = _c_this.collection.insert();
		for (var i = 0; i < fields.length; i++) {
			var field = fields[i];
			insert.set(field.name, _c_this.getFieldValue(field.name));
			}
		var res = (await insert.run/* async call */());
		_c_this.id = res.id;}

/*i async*/Blog.Archive.prototype.loadFromMap = async function (data) {var _c_this = this; var _c_root_method_arguments = arguments;
		_c_this.rawFields = data;
		
			for (let k in data) {
				if (data.hasOwnProperty(k) && this.hasOwnProperty(k)) {
					let camel = k[0].toUpperCase() + k.substr(1, k.length);

					if (this["load" + camel]) {
						await this["load" + camel](data[k]);
					}else{
						this[k] = data[k];
					}
				}
			}
		
		}

Blog.Archive.getSchema = function (collection) {var _c_this = this; var _c_root_method_arguments = arguments;
		return collection.schema();}

Blog.Post = function () {var _c_this = this;
	this.rawFields = null;

	this.collection = null;

	this.id = "";

	this.content = "";

	this.tags = [];

	this.tagsCache = [];

	this.categories = [];

	this.categoriesCache = [];

	this.slug = "";

	this.title = "";

	this.created = null;

	this.modified = null;

	this.excerpt = "";

	this.featuredImage = "";

	this.displayStatus = "public";

	this.revisions = 0;

	this.authors = null;


}

/*i async*/Blog.Post.prototype.load = async function () {var _c_this = this; var _c_root_method_arguments = arguments;
/*async*/
		var doc = (await _c_this.collection.document/* async call */(_c_this.id));
		(await _c_this.loadFromMap/* async call */(doc.data()));}

/*i async*/Blog.Post.prototype.loadEntityArray = async function (arr) {var _c_this = this; var _c_root_method_arguments = arguments;
/*async*/
		if (arr.length > 0) {
/*async*/
			var collection = arr[0].collection;
			var ids = [];
			for (var i = 0; i < arr.length; i++) {
				ids.push(arr[i].id);
				}
			var docs = (await collection.getAll/* async call */(ids));
			for (var i = 0; i < docs.length; i++) {
/*async*/
				var doc = docs[i];
				var entity = arr.find(function (ent) {
					return ent.id == doc.id;
					});
				(await entity.loadFromMap/* async call */(doc.data()));
				}
			}}

Blog.Post.applySchema = function (collection) {var _c_this = this; var _c_root_method_arguments = arguments;
		_c_this.linkToCollection(collection);
		
			return this.getSchema(collection);
		
		}

Blog.Post.linkToCollection = function (collection) {var _c_this = this; var _c_root_method_arguments = arguments;
		
			collection.entityTemplate = this;
		
		}

Blog.Post.prototype.getFieldValue = function (field) {var _c_this = this; var _c_root_method_arguments = arguments;
		
			let camel = field[0].toUpperCase() + field.substr(1, field.length);

			if (this["save" + camel]) {
				return this["save" + camel](this[field]);
			}else{
				return this[field];
			}
		
		}

Blog.Post.prototype.getFieldsChanged = function () {var _c_this = this; var _c_root_method_arguments = arguments;
		var fieldsChanged = [];
		for (var i = 0; i < _c_this.collection.appliedSchema.fields.length; i++) {
			var field = _c_this.collection.appliedSchema.fields[i];
			var realValue = null;
			var myValue = _c_this.getFieldValue(field.name);
			var rawValue = null;
			if (_c_this.rawFields != null) {
				rawValue = _c_this.rawFields[field.name];
				}
			var isDifferent = false;
			if (field.type == "time") {
				var cast = myValue;
				if (cast == null) {
					realValue = null;
					}else{
						realValue = cast.timestamp;
					}
				isDifferent = realValue != rawValue;
				}else if (field.type == "reference") {
				var cast = myValue;
				if (cast != null) {
					realValue = cast.id;
					}
				isDifferent = realValue != rawValue;
				}else if (field.type == "array") {
				
					isDifferent = JSON.stringify(myValue) != JSON.stringify(rawValue);
				
				
				}else{
					realValue = myValue;
					isDifferent = realValue != rawValue;
				}
			if (isDifferent) {
				fieldsChanged.push(field);
				}
			}
		return fieldsChanged;}

/*i async*/Blog.Post.prototype.saveToCollection = async function () {var _c_this = this; var _c_root_method_arguments = arguments;
/*async*/
		var fields = _c_this.getFieldsChanged();
		var update = _c_this.collection.update().where("id", "==", _c_this.id);
		for (var i = 0; i < fields.length; i++) {
			var field = fields[i];
			update.set(field.name, _c_this.getFieldValue(field.name));
			}
		return (await update.run/* async call */());}

/*i async*/Blog.Post.prototype.insertIntoCollection = async function () {var _c_this = this; var _c_root_method_arguments = arguments;
/*async*/
		var fields = _c_this.getFieldsChanged();
		var insert = _c_this.collection.insert();
		for (var i = 0; i < fields.length; i++) {
			var field = fields[i];
			insert.set(field.name, _c_this.getFieldValue(field.name));
			}
		var res = (await insert.run/* async call */());
		_c_this.id = res.id;}

/*i async*/Blog.Post.prototype.loadFromMap = async function (data) {var _c_this = this; var _c_root_method_arguments = arguments;
		_c_this.rawFields = data;
		
			for (let k in data) {
				if (data.hasOwnProperty(k) && this.hasOwnProperty(k)) {
					let camel = k[0].toUpperCase() + k.substr(1, k.length);

					if (this["load" + camel]) {
						await this["load" + camel](data[k]);
					}else{
						this[k] = data[k];
					}
				}
			}
		
		}

Blog.Post.prototype.loadCreated = function (value) {var _c_this = this; var _c_root_method_arguments = arguments;
		_c_this.created = new Websom.Time();
		_c_this.created.timestamp = value;}

Blog.Post.prototype.loadModified = function (value) {var _c_this = this; var _c_root_method_arguments = arguments;
		_c_this.modified = new Websom.Time();
		_c_this.modified.timestamp = value;}

Blog.Post.getSchema = function (collection) {var _c_this = this; var _c_root_method_arguments = arguments;
		return collection.schema().field("tags", "array").field("tagsCache", "array").field("categories", "array").field("categoriesCache", "array").field("slug", "string").field("title", "string").field("created", "time").field("modified", "time").field("excerpt", "string").field("featuredImage", "string").field("displayStatus", "string").field("revisions", "integer").field("authors", "array");}


module.exports = Blog.Module;