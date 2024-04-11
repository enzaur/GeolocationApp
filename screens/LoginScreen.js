import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons
import image from '../design/coolor@4x-8.png'; // Import your image source

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    const handleLogin = () => {
        if (username === 'admin' && password === '123456789') {
            // Successful login
            // Navigate to the 'Home' screen
            navigation.navigate('Home'); // Ensure you have a screen named 'Home' in your navigation stack
        } else {
            // Failed login
            showAlert('Invalid credentials', 'Please enter valid username and password');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Toggle password visibility state
    };

    const showAlert = (title, message) => {
        Alert.alert(
            title,
            message,
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: false }
        );
    };

    return (
        <View style={styles.container}>
            <Image source={image} style={styles.image} />
            <Text style={styles.welcomeText}>Welcome</Text>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={text => setUsername(text)}
                />
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Password"
                        secureTextEntry={!showPassword} // Toggle secureTextEntry based on showPassword state
                        value={password}
                        onChangeText={text => setPassword(text)}
                    />
                    {/* Icon button to toggle password visibility */}
                    <TouchableOpacity onPress={togglePasswordVisibility} style={styles.showPasswordButton}>
                        <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="#104DBFff" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    image: {
        width: 80,
        height: 95,
        resizeMode: 'contain',
        marginBottom: 20, // Adjust margin as needed
    },
    welcomeText: {
        fontSize: 50,
        textAlign: 'center',
        color: 'gray',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    form: {
        width: '80%',
    },
    input: {
        borderWidth: 1,
        borderColor: '#104DBFff',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    passwordContainer: {
        position: 'relative',
    },
    passwordInput: {
        borderWidth: 1,
        borderColor: '#104DBFff',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    showPasswordButton: {
        position: 'absolute',
        top: 12,
        right: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#104DBFff',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LoginScreen;
