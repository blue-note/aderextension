package models;

import javax.persistence.*;
//import play.db.ebean.Model;
import play.db.jpa.*;

@Entity
public class Person {
    
  @Id
  public int id;     
    
  public String email;

  public String password;

  public Person(String email, String password) {
    this.id = 0;
    this.email = email;
    this.password = password;
    
  }

  public static Person findById(String id) {
      return JPA.em().find(Person.class, id);
      
  }
   
 public void save() {
   JPA.em().persist(this);
     
 }
    
}
