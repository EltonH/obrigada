import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Register = new Mongo.Collection('register');

Meteor.methods({
    'register.insert'(register){
        check(register, Object);

        // Check if user is Logger in
        if(!Meteor.userId()){
            throw new Meteor.Error('not-authorized');
        }

        Register.insert({
            type: register.type,
            time: register.time,
            date: register.date,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username
        });
    },
    'register.remove'(register){
        check(register._id, String);

        if(register.owner !== Meteor.userId()){
            throw new Meteor.Error('not-authorized');
        }

        Register.remove(register._id);
    }
});