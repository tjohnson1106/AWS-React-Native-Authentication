import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import Amplify, { Auth } from "aws-amplify";
import AWSConfig from "./aws-exports";

Amplify.configure(AWSConfig);

export default class App extends Component {
  state = {
    username: "",
    password: "",
    phone_number: "",
    email: "",
    confirmationCode: ""
  };
  onChangeText(key, value) {
    this.setState({
      [key]: value
    });
  }
  signUp() {
    Auth.signUp({
      username: this.state.username,
      password: this.state.password,
      attributes: {
        email: this.state.email,
        phone_number: this.state.phone_number
      }
    })
      .then(() => console.log("successful confirm signup!"))
      .catch(err => console.log("error signing up!: ", err));
  }
  confirmSignUp() {
    Auth.confirmSignUp(this.state.username, this.state.confirmationCode)
      .then(() => console.log("successful signup!"))
      .catch(err => console.log("error confirming signing up!: ", err));
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={value => this.onChangeText("username", value)}
          style={styles.input}
          placeholder="username"
        />
        <TextInput
          onChangeText={value => this.onChangeText("username", value)}
          style={styles.input}
          placeholder="username"
        />
        <TextInput
          onChangeText={value => this.onChangeText("password", value)}
          style={styles.input}
          secureTextEntry={true}
          placeholder="password"
        />
        <TextInput
          onChangeText={value => this.onChangeText("email", value)}
          style={styles.input}
          placeholder="email"
        />
        <Button title="sign up" onPress={this.signUp.bind(this)} />
        <TextInput
          onChangeText={value => this.onChangeText("confirmationCode", value)}
          style={styles.input}
          placeholder="confirmationCode"
        />
        <Button
          title="Confirm sign up"
          onPress={this.confirmSignUp.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderBottomWidth: 3,
    borderBottomColor: "#22A7F0",
    margin: 10
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
