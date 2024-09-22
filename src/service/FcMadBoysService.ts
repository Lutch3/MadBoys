// Import the functions you need from the SDKs you need
import * as firebase from 'firebase/app';
import 'firebase/firestore';
// import { deleteDoc, doc, getFirestore, orderBy, query, setDoc } from 'firebase/firestore';
// import { collection, getDocs, addDoc } from 'firebase/firestore';
import { Event, EventPlayer, Team, Player } from '../model/models';

import {
  doc,
  deleteDoc,
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
  getFirestore,
  updateDoc,
  OrderByDirection
} from 'firebase/firestore';

import { signInWithEmailAndPassword, getAuth, signOut} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcsZyBbbXKESSFNxmjv_-JSOZVTtuMp7g",
  authDomain: "fc-mad-boys.firebaseapp.com",
  projectId: "fc-mad-boys",
  storageBucket: "fc-mad-boys.appspot.com",
  messagingSenderId: "27930194349",
  appId: "1:27930194349:web:eed8528381df1b4fbcb124"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const fireStore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export const login = async (username:string, password:string) => {
  await signInWithEmailAndPassword(auth,username,password);
}

export const logout = async () => {
    await signOut(auth);
}

export const findAll = async (collectionName: string, orderByProperty:string, orderByDirection?:OrderByDirection) => {
  const collectionRef = collection(fireStore, collectionName);
  const q = query(collectionRef, orderBy(orderByProperty, orderByDirection));
  const doc_refs = await getDocs(q);

  const result: any[] = [];

  
  doc_refs.forEach((r: any) => {
    result.push({
      id: r.id,
      ...r.data(),
    });
  });
  return result;
};

//PLAYERS
export const addPlayer = async (player: Player) => {
  try {
    const docRef: any = await addDoc(collection(fireStore, 'players'), player);
    return { id: docRef.id, name: player.name };
  } catch (e) {
    console.error('Error adding Player document: ', e);
  }
};

export const removePlayer = async (player: Player) => {
  const colletionRef = collection(fireStore, 'players');
  const playerRef = doc(colletionRef, player.id);
  try {
    await deleteDoc(playerRef);
  } catch (error) {
    console.error(error);
  }
};

//TEAMS
export const addTeam = async (team: Team) => {
  try {
    const docRef: any = await addDoc(collection(fireStore, 'teams'), team);
    return { id: docRef.id, name: team.name };
  } catch (e) {
    console.error('Error adding Team document: ', e);
  }
};

export const removeTeam = async (team: Team) => {
  const colletionRef = collection(fireStore, 'teams');
  const teamRef = doc(colletionRef, team.id);
  try {
    await deleteDoc(teamRef);
  } catch (error) {
    console.error(error);
  }
};

//EVENTS
export const addEvent = async (event: Event) => {
  try {
    const docRef: any = await addDoc(collection(fireStore, 'events'), event);
    const obj = { id: docRef.id
                , date: event.date
                , homeTeamId:event.homeTeamId
                , awayTeamId:event.awayTeamId
                , homeTeamScore: event.homeTeamScore
                , awayTeamScore:event.awayTeamScore
                , season:event.season};
    return obj;
  } catch (e) {
    console.error('Error adding Event document: ', e);
  }
};

export const removeEvent = async (event: Event) => {
  const colletionRef = collection(fireStore, 'events');
  const eventRef = doc(colletionRef, event.id);
  try {
    await deleteDoc(eventRef);
  } catch (error) {
    console.error(error);
  }
};

//EVENT PLAYERS
export const addEventPlayer = async (eventPlayer: EventPlayer) => {
  try {
    const docRef: any = await addDoc(collection(fireStore, 'eventPlayers'), eventPlayer);
    const obj = { id: docRef.id
                , eventId: eventPlayer.eventId
                , playerId: eventPlayer.playerId
                , hasYellowCard: eventPlayer.hasYellowCard
                , hasRedCard :eventPlayer.hasRedCard
                , goals: eventPlayer.goals
                , isDelegue:eventPlayer.isDelegue
                , isCaptain:eventPlayer.isCaptain 
                , season : eventPlayer.season};
    return obj;
  } catch (e) {
    console.error('Error adding Event Player document: ', e);
  }
};

export const updateEventPlayer = async (eventPlayer: EventPlayer) => {
  try {
    const colletionRef = collection(fireStore, 'eventPlayers');
    const eventPlayerRef = doc(colletionRef, eventPlayer.id);
    await updateDoc(eventPlayerRef, {id:eventPlayerRef.id
                                    ,eventId:eventPlayer.eventId
                                    ,playerId:eventPlayer.playerId
                                    ,hasYellowCard: eventPlayer.hasYellowCard
                                    ,hasRedCard :eventPlayer.hasRedCard
                                    ,goals: eventPlayer.goals
                                    ,isDelegue:eventPlayer.isDelegue
                                    ,isCaptain:eventPlayer.isCaptain
                                    ,season:eventPlayer.season })
    const obj = {id: eventPlayerRef.id 
                ,eventId:eventPlayer.eventId
                ,playerId:eventPlayer.playerId
                ,hasYellowCard: eventPlayer.hasYellowCard
                ,hasRedCard :eventPlayer.hasRedCard
                ,goals: eventPlayer.goals
                ,isDelegue:eventPlayer.isDelegue
                ,isCaptain:eventPlayer.isCaptain
                ,season:eventPlayer.season };
    return obj;
  } catch (e) {
    console.error('Error adding Event Player document: ', e);
  }
};

export const removeEventPlayer = async (eventPlayer: EventPlayer) => {
  const colletionRef = collection(fireStore, 'eventPlayers');
  const eventPlayerRef = doc(colletionRef, eventPlayer.id);
  try {
    await deleteDoc(eventPlayerRef);
  } catch (error) {
    console.error(error);
  }
};