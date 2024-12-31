# Project Requirements Document (PRD) - Visitra

## Project Overview
Visitra is a mobile application that allows users to manage their travel plans and record their experiences.

## Goals
- Users should be able to save the places they want to travel to.
- Users should be able to categorize locations.
- Users should be able to add notes.
- Users should be able to mark the places they have visited.
- Users should be able to manage their places with various filtering options.

## User Requirements
- Users should be able to add new places through the application.
- Users should be able to upload photos for the places they add.
- Users should be able to take notes about the places.
- Users should be able to add places to their favorites.

## Technical Requirements
- **Core Technologies**: React Native, Expo SDK 52, TypeScript
- **Database**: Supabase
- **Local Storage**: AsyncStorage
- **Map and Location Services**: React Native Maps, Expo Location
- **UI Libraries**: React Native Paper, React Native Vector Icons, React Native Reanimated
- **Navigation**: React Navigation v7
- **State Management**: Redux Toolkit

## Project Structure
```
src/
├── assets/         # Images, fonts, and other static files
├── components/     # Reusable UI components
├── screens/        # Application screens
├── navigation/     # Navigation configuration
├── services/       # API and Firebase services
├── store/          # Redux store and slices
├── hooks/          # Custom React hooks
├── utils/          # Helper functions
└── types/          # TypeScript type definitions 
