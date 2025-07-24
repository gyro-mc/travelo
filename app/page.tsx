// app/page.tsx
import { SignedIn, SignedOut, SignInButton, SignOutButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";

export default function Home() {
  return (
    <div>
      <SignedIn>
        <SignedInContent />
      </SignedIn>
      <SignedOut>
        <h1>The user is not signed in <SignInButton /></h1>
      </SignedOut>
    </div>
  );
}

async function SignedInContent() {
  const authData = await auth();
  const user = await currentUser();

  console.log({ "the auth object": authData });
  console.log({ "the current user data": user });

  return (
    <h1>The user is signed in <SignOutButton /></h1>
  );
}
