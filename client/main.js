import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';
import { Register } from '../lib/collections.js';

// Accounts config
Accounts.ui.config({
  passwordSignupFields:'USERNAME_ONLY'
})

import './main.html';

Router.route('/', function () {
  this.render('login');
});

Router.route('/register', function () {
  this.render('register');
});

Router.route('/home', function () {
  this.layout('ApplicationLayout');
  this.render('sidebar', {to: 'sidebar'});
  this.render('home');
});

Router.route('/register-time', function () {
  this.layout('ApplicationLayout');
  this.render('sidebar', {to: 'sidebar'});
  this.render('registerTime');
});

Template.login.events({
  'submit form': function(event){
    event.preventDefault();
    var username = event.target.username.value;
    var password = event.target.password.value;
    Meteor.loginWithPassword(username, password, function(error){
      if(error){
        $('.error-msg').text(error.reason);
      } else {
        Router.go("home");
      }
    });
  },
  'click .button-register': function() {
    Router.go("register");
  }
});

Template.sidebar.events({
  'click .logout': function(event){
      event.preventDefault();
      Meteor.logout();
      $('.sidenav').sidenav('close');
      Router.go('/');
  }
});

Template.home.events({
  'click .register-time': function(){
    Router.go("register-time");
  }
});

Template.home.helpers({
  registerTimeLists(){
    return Register.find({});
  }
});

Template.registerTimeList.events({
  'click .delete-register':function() {
    Meteor.call('register.remove', this);
    return false;
  }
})

Template.register.events({
  'submit form': function(event){
    event.preventDefault();
    var username = event.target.username.value;
    var password = event.target.password.value;
    Accounts.createUser({
      username: username,
      password: password
    });
    Router.go("/");
  },
  'click .button-back-login': function() {
    Router.go("/");
  }
});

Template.registerTime.events({
  'submit form': function(event){
    event.preventDefault();
    var type = event.target.type.value;
    var time = event.target.time.value;
    var date = event.target.date.value;
    Meteor.call('register.insert', {type, time, date});
    Router.go("/home");
  },
  'click .back-home': function() {
    Router.go("/home");
  }
});