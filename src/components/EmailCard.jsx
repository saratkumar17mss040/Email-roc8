import { formatDate } from "../utils";

export default function EmailCard({ email }) {
  return (
    <li
      className={`border cursor-pointer ml-3 ${
        email.filters.isRead && "bg-gray-100"
      }`}
      id={email.id}
    >
      <div className="w-8 h-8 rounded-full font-bold bg-pink-500 text-white text-center flex justify-center items-center">
        {email.from.name[0].toUpperCase()}
      </div>
      <div>
        <h1>{email.subject}</h1>
        <p>{email.from.name}</p>
        <p>{email.short_description}</p>
        <p>{email.from.email}</p>
        <p>{formatDate(email.date)}</p>
        <p className="text-pink-500">
          {email.filters.isFavorite && "Favorite"}{" "}
        </p>
      </div>
    </li>
  );
}
