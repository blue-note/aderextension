// @SOURCE:/Users/janitachalam/Documents/aderextension/aderServer/ader/conf/routes
// @HASH:2ba23fda4ba4c182f0d10ce0da2176be9f5abe21
// @DATE:Wed Jan 21 22:32:45 EST 2015

import Routes.{prefix => _prefix, defaultPrefix => _defaultPrefix}
import play.core._
import play.core.Router._
import play.core.Router.HandlerInvokerFactory._
import play.core.j._

import play.api.mvc._
import _root_.controllers.Assets.Asset
import _root_.play.libs.F

import Router.queryString


// @LINE:14
// @LINE:11
// @LINE:8
package controllers {

// @LINE:14
// @LINE:8
class ReverseAssets {


// @LINE:14
// @LINE:8
def at(file:String): Call = {
   (file: @unchecked) match {
// @LINE:8
case (file) if file == "signIn.html" =>
  implicit val _rrc = new ReverseRouteContext(Map(("path", "/public"), ("file", "signIn.html")))
  Call("GET", _prefix)
                                         
// @LINE:14
case (file)  =>
  implicit val _rrc = new ReverseRouteContext(Map(("path", "/public")))
  Call("GET", _prefix + { _defaultPrefix } + "assets/" + implicitly[PathBindable[String]].unbind("file", file))
                                         
   }
}
                                                

}
                          

// @LINE:11
class ReverseAuthentication {


// @LINE:11
def register(email:String, password:String): Call = {
   import ReverseRouteContext.empty
   Call("GET", _prefix + { _defaultPrefix } + "register" + queryString(List(Some(implicitly[QueryStringBindable[String]].unbind("email", email)), Some(implicitly[QueryStringBindable[String]].unbind("password", password)))))
}
                        

}
                          
}
                  


// @LINE:14
// @LINE:11
// @LINE:8
package controllers.javascript {
import ReverseRouteContext.empty

// @LINE:14
// @LINE:8
class ReverseAssets {


// @LINE:14
// @LINE:8
def at : JavascriptReverseRoute = JavascriptReverseRoute(
   "controllers.Assets.at",
   """
      function(file) {
      if (file == """ + implicitly[JavascriptLitteral[String]].to("signIn.html") + """) {
      return _wA({method:"GET", url:"""" + _prefix + """"})
      }
      if (true) {
      return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "assets/" + (""" + implicitly[PathBindable[String]].javascriptUnbind + """)("file", file)})
      }
      }
   """
)
                        

}
              

// @LINE:11
class ReverseAuthentication {


// @LINE:11
def register : JavascriptReverseRoute = JavascriptReverseRoute(
   "controllers.Authentication.register",
   """
      function(email,password) {
      return _wA({method:"GET", url:"""" + _prefix + { _defaultPrefix } + """" + "register" + _qS([(""" + implicitly[QueryStringBindable[String]].javascriptUnbind + """)("email", email), (""" + implicitly[QueryStringBindable[String]].javascriptUnbind + """)("password", password)])})
      }
   """
)
                        

}
              
}
        


// @LINE:14
// @LINE:11
// @LINE:8
package controllers.ref {


// @LINE:14
// @LINE:8
class ReverseAssets {


// @LINE:8
def at(path:String, file:String): play.api.mvc.HandlerRef[_] = new play.api.mvc.HandlerRef(
   controllers.Assets.at(path, file), HandlerDef(this.getClass.getClassLoader, "", "controllers.Assets", "at", Seq(classOf[String], classOf[String]), "GET", """""", _prefix + """""")
)
                      

}
                          

// @LINE:11
class ReverseAuthentication {


// @LINE:11
def register(email:String, password:String): play.api.mvc.HandlerRef[_] = new play.api.mvc.HandlerRef(
   controllers.Authentication.register(email, password), HandlerDef(this.getClass.getClassLoader, "", "controllers.Authentication", "register", Seq(classOf[String], classOf[String]), "GET", """ Authentication""", _prefix + """register""")
)
                      

}
                          
}
        
    