import { useState, useEffect } from "react";
import { emailApiClient } from "../emailApiClient";
import { formatDate } from "../utils";

export default function EmailBody({ email, onAddFavorite }) {
  const [emailBody, setEmailBody] = useState(null);

  //effect to fetch email body when email object changes
  useEffect(() => {
    async function fetchEmailBodyByIdWrapper() {
      const response = await emailApiClient.fetchEmailBodyById(email.id);
      setEmailBody(response.body);
    }
    window.scrollTo(0, 0);
    fetchEmailBodyByIdWrapper();
  }, [email]);

  if (!email) {
    return (
      <div className="flex-1">
        <h1>No Email Body Found</h1>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <h1>{email.subject}</h1>
      <button
        className="bg-pink-500 text-white p-2 rounded-full"
        onClick={() => onAddFavorite(email.id)}
      >
        Mark as favorite
      </button>
      <p>{email.from.name}</p>
      <p>{formatDate(email.date)}</p>
      <p>{email.short_description}</p>
      {/* Need sanitization. Vulnerable to XSS Attacks */}
      <div dangerouslySetInnerHTML={{ __html: emailBody }} />
      <p>{email.from.email}</p>
    </div>
  );
}
