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
      <div className="m-4 flex-1">
        <h1>No Email Body Found</h1>
      </div>
    );
  }

  return (
    <div className="flex-1 m-4 p-4 border rounded-md border-gray-400">
      <div className="flex justify-between">
        <div className="w-12 h-12 rounded-full font-bold text-xl bg-pink-500 text-white text-center flex justify-center items-center">
          {email.from.name[0].toUpperCase()}
        </div>
        <div className="flex-1 ml-6">
          <h1 className="text-xl font-bold">{email.subject}</h1>
          <p>{formatDate(email.date)}</p>
        </div>
        <button
          className="bg-pink-500 text-white px-4 py-1 rounded-full h-fit"
          onClick={() => onAddFavorite(email.id)}
        >
          Mark as favorite
        </button>
      </div>
      {/* <p>{email.from.name}</p>
      <p>{email.short_description}</p> */}
      {/* Need sanitization. Vulnerable to XSS Attacks */}
      <div
        className="p-4 mt-4"
        dangerouslySetInnerHTML={{ __html: emailBody }}
      />
      {/* <p>{email.from.email}</p> */}
    </div>
  );
}
