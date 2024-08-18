import { useParams } from "react-router-dom";

export default function ActivateAccountPage() {
  const { uidb64, token } = useParams();
  return (
    <>
      <h1>Activate</h1>
      <p>uidb64: {uidb64}</p>
      <p>token: {token}</p>
    </>
  );
}
