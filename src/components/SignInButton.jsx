import { signIn } from "@astro-auth/client";
import { ReactStateStore } from "@astro-auth/client";

export default function SignInButton(){
  const user = ReactStateStore.useUser({ update: true });

  return (
    <div>
      <button
        onClick={() => {
          signIn({
            provider: "github",
          });
        }}
      >
        Sign In
      </button>

      <pre>{JSON.stringify(user)}</pre>
    </div>
  );
};
