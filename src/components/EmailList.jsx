import EmailCard from "./EmailCard";

export default function EmailList({ emailList, onEmailClick }) {
  if (emailList.length === 0) {
    return (
      <div className="cursor-pointer flex-1" onClick={onEmailClick}>
        <p>No emails found</p>
      </div>
    );
  }
  return (
    <div className="cursor-pointer flex-1" onClick={onEmailClick}>
      <ul>
        {emailList.map((email) => (
          <EmailCard key={email.id} email={email} />
        ))}
      </ul>
    </div>
  );
}
