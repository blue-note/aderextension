package controllers;

import play.*;
import play.mvc.*;
import models.*;
import views.html.*;
import play.libs.Json;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import play.db.jpa.*;

public class Authentication extends Controller {

  public static Result authenticate() {
    return ok("Success");
  }

  //@BodyParser.Of(BodyParser.Json.class)
  @Transactional
  public static Result register(String email, String password) {
    //JPA.em().find(Users.class, email);
    ObjectNode result = Json.newObject();
    // Person person = Person.findById(email);
    // if (person == null) result.put("yo", "already exists");
    // else {
    Person user = new Person(email, password);
    //user.save();
    JPA.em("default").persist(user);
    //Person person = Person.findById(email);
     result.put("yo", "json sucess");
     
    //return ok("Success");
   //}
   return ok(result);
  }
}
