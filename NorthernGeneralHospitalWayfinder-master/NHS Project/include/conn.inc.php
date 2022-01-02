<?php
$dsn = "mysql:host=localhost;dbname=b6035398_db2";
$user = "b6035398";
$password = "osprey12";
//$pdo = new pdo($dsn ,$user ,$password);
try {
$pdo = new pdo($dsn ,$user ,$password);
$pdo ->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$pdo ->exec("SET CHARACTER SET utf8");
}
catch (PDOException $e) {
echo 'Connection failed again: ' . $e->getMessage();
}
?>


