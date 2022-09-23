import { withAuthenticator } from "@aws-amplify/ui-react";

const Score = ({ user }: any) => {
  return (
    <>
      <div>Score: {user.attributes["custom:Score"]}</div>
    </>
  );
};

export default withAuthenticator(Score);
