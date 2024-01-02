// Type definitions for all Firestore collections

export interface Profile {
  user_id: string;
  display_name: string;
  biography: string;
}

export interface Clubs {
  id: string;
  owner: string;
  name: string;
  description: string;
  member_count: number;
  // likes: number;
  members: string[]; // Every string must be a user id in profiles
}

//list all mebers in the club
//Iteratie through Club.members and fetch the user profile for each IdleDeadline

//EASIER
//performing queries in firebase, array-contains filters based on array values
//fetch all clubs
//filter the master club list for clubs that contaein the user id
// display the filtered set
