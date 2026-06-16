import { useState } from "react";
import { resetPassword } from "../../api/userApi";
import { toast } from "react-toastify";

export default function ResetPasswordForm({ userId, onClose }) {

  const [password, setPassword] = useState("");


  const handleSubmit = async (e) => {

      e.preventDefault();
      
      await resetPassword(userId, password);
      toast.success("Password updated");
      onClose();
    };

  return (

    <form onSubmit={handleSubmit}>

      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Save</button>
    </form>

  );

}