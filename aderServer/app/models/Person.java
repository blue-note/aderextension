package models;

import javax.persistence.*;
//import play.db.ebean.Model;
import play.db.jpa.*;


@Entity
public class Person {

  private int id;     
   
  @Id 
  private String email;

  private String password;
  
  public Person() {
    email = "";
    password = "";
  }

  public Person(String email, String password) {
    this.id = 0;
    this.email = email;
    this.password = password;
    
  }

  public static Person findById(String id) {
      if (!JPA.em().contains(Person.class)) return null;
     else return JPA.em().find(Person.class, id);
      
  }
   
 public void save() {
   JPA.em().persist(this);
     
 }
    
}
