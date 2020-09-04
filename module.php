<?php
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
class Blog {

function __construct(...$arguments) {


}

}class Blog_Module {
public $postsPermission;

public $postsView;

public $server;

public $baseConfig;

public $containers;

public $bridges;

public $registeredCollections;

public $registeredPermissions;

public $registeredBuckets;

public $name;

public $id;

public $root;

public $version;

public $author;

public $license;

public $repo;

public $posts;

public $archives;

function __construct($server) {
$this->postsPermission = null;
$this->postsView = null;
$this->server = null;
$this->baseConfig = null;
$this->containers = [];
$this->bridges = [];
$this->registeredCollections = [];
$this->registeredPermissions = [];
$this->registeredBuckets = [];
$this->name = "";
$this->id = "";
$this->root = "";
$this->version = "";
$this->author = "";
$this->license = "";
$this->repo = "";
$this->posts = null;
$this->archives = null;

$this->server = $server;
$this->registerWithServer();
}
function start() {
}

function permissions() {
$this->postsPermission = $this->registerPermission("Posts.Admin")->setDescription("Posts admin permission.");
$this->postsView = $this->registerPermission("Posts.View")->isPublic()->setDescription("Public posts permission.");}

function collections() {
$db = $this->server->database->central;
$this->posts = $db->collection("posts");
Blog_Post::applySchema($this->posts);
$this->registerCollection($this->posts);
$this->archives = $db->collection("archives");
Blog_Archive::applySchema($this->archives);
$this->registerCollection($this->archives);
$this->server->api->generateAdminEndpoints($this->posts, "/posts", $this->postsPermission)->exposeSchemaTo($this->postsPermission)->generateSearchEndpoint([], $this->postsView);}

function registerWithServer() {
}

function clientData($req, $send) {
return false;}

function spawn($config) {
$this->baseConfig = $config;
$this->name = $config["name"];
$this->id = $config["id"];}

function stop() {
}

function configure() {
}

function registerCollection($collection) {
array_push($this->registeredCollections, $collection);
if ($this->server->config->dev) {
if ($collection->appliedSchema != null) {
$collection->appliedSchema->register();}}}

function registerPermission(...$arguments) {
if (count($arguments) == 1 and ((_c_lib_run::getClass($arguments[0]) == 'Websom_Permission') or gettype($arguments[0]) == 'NULL')) {
$permission = $arguments[0];
array_push($this->registeredPermissions, $permission);
}
else if (count($arguments) == 1 and (gettype($arguments[0]) == 'string' or gettype($arguments[0]) == 'NULL')) {
$permission = $arguments[0];
$perm = new Websom_Permission($permission);
array_push($this->registeredPermissions, $perm);
return $perm;
}
}

function registerBucket($name) {
$bucket = new Websom_Bucket($this->server, $name, $this->name);
array_push($this->registeredBuckets, $bucket);
$this->server->registerBucket($bucket);
return $bucket;}

function setupData() {
}

function setupBridge() {
}

function pullFromGlobalScope($name) {
}

function &setupBridges() {
$bridges = [];
return $bridges;}


}//Relative Carbon
//Relative Context
//Relative Error
//Relative FileSystem
//Relative Buffer
//Relative File
//Relative Stat
//Relative primitive
//Relative object
//Relative Math
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
class Blog_Archive {
public $rawFields;

public $collection;

public $id;

public $year;

public $month;

public $count;

function __construct() {
$this->rawFields = null;
$this->collection = null;
$this->id = "";
$this->year = "";
$this->month = "";
$this->count = 0;


}
function load() {
$doc = $this->collection->document($this->id);
$this->loadFromMap($doc->data());}

function loadEntityArray($arr) {
if (count($arr) > 0) {
$collection = _c_lib__arrUtils::readIndex($arr, 0)->collection;
$ids = [];
for ($i = 0; $i < count($arr); $i++) {
array_push($ids, _c_lib__arrUtils::readIndex($arr, $i)->id);}
$docs = &$collection->getAll($ids);
for ($i = 0; $i < count($docs); $i++) {
$doc = _c_lib__arrUtils::readIndex($docs, $i);
$entity = _c_lib__arrUtils::find($arr, function ($ent) use (&$i, &$doc, &$entity, &$collection, &$ids, &$docs, &$arr) {return $ent->id == $doc->id;});
$entity->loadFromMap($doc->data());}}}

static function applySchema($collection) {
$this::linkToCollection($collection);


			return self::getSchema($collection);
		}

static function linkToCollection($collection) {


			$collection->entityTemplate = __CLASS__;
		}

function getFieldValue($field) {


			$camel = ucfirst($field);
			
			if (method_exists($this, "save" . $camel)) {
				return $this->{"save" . $camel}($this->{$k});
			}else{
				return $this->{$k};
			}
		}

function &getFieldsChanged() {
$fieldsChanged = [];
for ($i = 0; $i < count($this->collection->appliedSchema->fields); $i++) {
$field = _c_lib__arrUtils::readIndex($this->collection->appliedSchema->fields, $i);
$realValue = null;
$myValue = $this->getFieldValue($field->name);
$rawValue = null;
if ($this->rawFields != null) {
$rawValue = $this->rawFields[$field->name];}
$isDifferent = false;
if ($field->type == "time") {
$cast = $myValue;
if ($cast == null) {
$realValue = null;}else{
$realValue = $cast->timestamp;}
$isDifferent = $realValue != $rawValue;}else if ($field->type == "reference") {
$cast = $myValue;
if ($cast != null) {
$realValue = $cast->id;}
$isDifferent = $realValue != $rawValue;}else if ($field->type == "array") {


					$isDifferent = count(array_diff($myValue, $rawValue)) > 0;
				}else{
$realValue = $myValue;
$isDifferent = $realValue != $rawValue;}
if ($isDifferent) {
array_push($fieldsChanged, $field);}}
return $fieldsChanged;}

function saveToCollection() {
$fields = &$this->getFieldsChanged();
$update = $this->collection->update()->where("id", "==", $this->id);
for ($i = 0; $i < count($fields); $i++) {
$field = _c_lib__arrUtils::readIndex($fields, $i);
$update->set($field->name, $this->getFieldValue($field->name));}
return $update->run();}

function insertIntoCollection() {
$fields = &$this->getFieldsChanged();
$insert = $this->collection->insert();
for ($i = 0; $i < count($fields); $i++) {
$field = _c_lib__arrUtils::readIndex($fields, $i);
$insert->set($field->name, $this->getFieldValue($field->name));}
$res = $insert->run();
$this->id = $res->id;}

function loadFromMap($data) {
$this->rawFields = $data;


			foreach ($data as $k => $v) {
				if (isset($this->$k)) {
					$camel = ucfirst($k);
					
					if (method_exists($this, "load" . $camel)) {
						$this->{"load" . $camel}($data[$k]);
					}else{
						$this->{$k} = $data[$k];
					}
				}
			}
		}

static function getSchema($collection) {
return $collection->schema();}


}class Blog_Post {
public $rawFields;

public $collection;

public $id;

public $content;

public $tags;

public $tagsCache;

public $categories;

public $categoriesCache;

public $slug;

public $title;

public $created;

public $modified;

public $excerpt;

public $featuredImage;

public $displayStatus;

public $revisions;

public $authors;

function __construct() {
$this->rawFields = null;
$this->collection = null;
$this->id = "";
$this->content = "";
$this->tags = [];
$this->tagsCache = [];
$this->categories = [];
$this->categoriesCache = [];
$this->slug = "";
$this->title = "";
$this->created = null;
$this->modified = null;
$this->excerpt = "";
$this->featuredImage = "";
$this->displayStatus = "public";
$this->revisions = 0;
$this->authors = null;


}
function load() {
$doc = $this->collection->document($this->id);
$this->loadFromMap($doc->data());}

function loadEntityArray($arr) {
if (count($arr) > 0) {
$collection = _c_lib__arrUtils::readIndex($arr, 0)->collection;
$ids = [];
for ($i = 0; $i < count($arr); $i++) {
array_push($ids, _c_lib__arrUtils::readIndex($arr, $i)->id);}
$docs = &$collection->getAll($ids);
for ($i = 0; $i < count($docs); $i++) {
$doc = _c_lib__arrUtils::readIndex($docs, $i);
$entity = _c_lib__arrUtils::find($arr, function ($ent) use (&$i, &$doc, &$entity, &$collection, &$ids, &$docs, &$arr) {return $ent->id == $doc->id;});
$entity->loadFromMap($doc->data());}}}

static function applySchema($collection) {
$this::linkToCollection($collection);


			return self::getSchema($collection);
		}

static function linkToCollection($collection) {


			$collection->entityTemplate = __CLASS__;
		}

function getFieldValue($field) {


			$camel = ucfirst($field);
			
			if (method_exists($this, "save" . $camel)) {
				return $this->{"save" . $camel}($this->{$k});
			}else{
				return $this->{$k};
			}
		}

function &getFieldsChanged() {
$fieldsChanged = [];
for ($i = 0; $i < count($this->collection->appliedSchema->fields); $i++) {
$field = _c_lib__arrUtils::readIndex($this->collection->appliedSchema->fields, $i);
$realValue = null;
$myValue = $this->getFieldValue($field->name);
$rawValue = null;
if ($this->rawFields != null) {
$rawValue = $this->rawFields[$field->name];}
$isDifferent = false;
if ($field->type == "time") {
$cast = $myValue;
if ($cast == null) {
$realValue = null;}else{
$realValue = $cast->timestamp;}
$isDifferent = $realValue != $rawValue;}else if ($field->type == "reference") {
$cast = $myValue;
if ($cast != null) {
$realValue = $cast->id;}
$isDifferent = $realValue != $rawValue;}else if ($field->type == "array") {


					$isDifferent = count(array_diff($myValue, $rawValue)) > 0;
				}else{
$realValue = $myValue;
$isDifferent = $realValue != $rawValue;}
if ($isDifferent) {
array_push($fieldsChanged, $field);}}
return $fieldsChanged;}

function saveToCollection() {
$fields = &$this->getFieldsChanged();
$update = $this->collection->update()->where("id", "==", $this->id);
for ($i = 0; $i < count($fields); $i++) {
$field = _c_lib__arrUtils::readIndex($fields, $i);
$update->set($field->name, $this->getFieldValue($field->name));}
return $update->run();}

function insertIntoCollection() {
$fields = &$this->getFieldsChanged();
$insert = $this->collection->insert();
for ($i = 0; $i < count($fields); $i++) {
$field = _c_lib__arrUtils::readIndex($fields, $i);
$insert->set($field->name, $this->getFieldValue($field->name));}
$res = $insert->run();
$this->id = $res->id;}

function loadFromMap($data) {
$this->rawFields = $data;


			foreach ($data as $k => $v) {
				if (isset($this->$k)) {
					$camel = ucfirst($k);
					
					if (method_exists($this, "load" . $camel)) {
						$this->{"load" . $camel}($data[$k]);
					}else{
						$this->{$k} = $data[$k];
					}
				}
			}
		}

function loadCreated($value) {
$this->created = new Websom_Time();
$this->created->timestamp = $value;}

function loadModified($value) {
$this->modified = new Websom_Time();
$this->modified->timestamp = $value;}

static function getSchema($collection) {
return $collection->schema()->field("tags", "array")->field("tagsCache", "array")->field("categories", "array")->field("categoriesCache", "array")->field("slug", "string")->field("title", "string")->field("created", "time")->field("modified", "time")->field("excerpt", "string")->field("featuredImage", "string")->field("displayStatus", "string")->field("revisions", "integer")->field("authors", "array");}


}
?>
<?php return 'Blog_Module'; ?>