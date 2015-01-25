name := """ader"""

version := "1.0"

lazy val root = (project in file(".")).enablePlugins(PlayJava)

scalaVersion := "2.11.1"

libraryDependencies ++= Seq(
    "org.hibernate" % "hibernate-entitymanager" % "4.3.6.Final",
  javaJdbc,
  cache,
  javaWs,
  javaJpa
)
