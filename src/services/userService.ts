import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getFirebaseAuth, getDb } from "@/firebase/config";

// Firestore collection where user profiles are stored.
const USERS_COLLECTION = "users";

export interface AppUser {
  id: string;
  name: string;
  email: string;
}

/** Translate Firebase error codes into friendly messages. */
function friendlyError(error: unknown): Error {
  const code = (error as any)?.code ?? "";
  const map: Record<string, string> = {
    "auth/email-already-in-use": "An account with this email already exists.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/weak-password": "Password must be at least 6 characters.",
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password.",
    "auth/invalid-credential": "Incorrect email or password.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
    "auth/network-request-failed": "Network error. Check your connection.",
  };
  return new Error(map[code] ?? (error as Error)?.message ?? "Authentication failed.");
}

/**
 * Create a new user with Firebase Auth AND store their profile in Firestore.
 */
export async function createUser(user: { name: string; email: string; password: string }): Promise<AppUser> {
  try {
    const auth = getFirebaseAuth();
    const cred = await createUserWithEmailAndPassword(auth, user.email, user.password);

    // Store the display name on the Firebase Auth profile.
    await updateProfile(cred.user, { displayName: user.name });

    // Store user profile in Firestore (users collection, document ID = uid).
    const userProfile = {
      name: user.name,
      email: cred.user.email!,
      createdAt: new Date().toISOString(),
    };
    await setDoc(doc(getDb(), USERS_COLLECTION, cred.user.uid), userProfile);

    return {
      id: cred.user.uid,
      name: user.name,
      email: cred.user.email!,
    };
  } catch (error) {
    throw friendlyError(error);
  }
}

/**
 * Sign in an existing user with Firebase Auth and fetch their Firestore profile.
 */
export async function loginUser(email: string, password: string): Promise<AppUser> {
  try {
    const auth = getFirebaseAuth();
    const cred = await signInWithEmailAndPassword(auth, email, password);

    // Try to fetch the user's profile from Firestore.
    let name = cred.user.displayName ?? "";
    try {
      const snap = await getDoc(doc(getDb(), USERS_COLLECTION, cred.user.uid));
      if (snap.exists()) {
        const data = snap.data();
        name = data.name ?? name;
      }
    } catch {
      // Firestore read failed — fall back to Auth displayName (non-blocking).
    }

    return {
      id: cred.user.uid,
      name,
      email: cred.user.email!,
    };
  } catch (error) {
    throw friendlyError(error);
  }
}