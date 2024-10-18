import { useEmailContext } from "../context/EmailContext";
import EmailList from "../components/EmailList";
import EmailBody from "../components/EmailBody";
import EmailPagination from "../components/EmailPagination";
import EmailFilter from "../components/EmailFilter";
import { useEffect, useState } from "react";
import withErrorBoundary from "../hoc/withErrorBoundary";

// Note: ErrorBoundaries wont catch errors in event handlers. we should use try catch block in those cases.
const EmailFilterWithErrorBoundary = withErrorBoundary(EmailFilter);
const EmailBodyWithErrorBoundary = withErrorBoundary(EmailBody);
const EmailListWithErrorBoundary = withErrorBoundary(EmailList);
const EmailPaginationWithErrorBoundary = withErrorBoundary(EmailPagination);

export default function Email() {
  const {
    isEmailLoading,
    error,
    emailList,
    setEmailList,
    totalEmailItems,
    emailFilter,
    setEmailFilter,
    pageNo,
  } = useEmailContext();
  const [clickedEmail, setClickedEmail] = useState(() => {
    const storedEmail = sessionStorage.getItem("clickedEmail");
    return storedEmail ? JSON.parse(storedEmail) : null;
  });

  // sync clicked email with session storage
  useEffect(() => {
    sessionStorage.setItem("clickedEmail", JSON.stringify(clickedEmail));
  }, [clickedEmail]);

  // sync reset clicked email with page no change only and reset filter to null. so it shows all emails again
  useEffect(() => {
    if (pageNo !== +sessionStorage.getItem("pageNo")) {
      setClickedEmail(null);
      sessionStorage.setItem("clickedEmail", null);
      setEmailFilter(null);
      sessionStorage.setItem("emailFilter", null);
    }
  }, [pageNo]);

  function handleEmailClick(event) {
    const emailEle = event.target.closest("li");
    if (emailEle) {
      const emailId = emailEle.id;
      let clickedEmail = emailList.find((email) => email.id === emailId);
      clickedEmail = {
        ...clickedEmail,
        filters: { ...clickedEmail.filters, isRead: true },
      };
      setEmailList((prevEmailList) => {
        return prevEmailList.map((email) => {
          if (email.id === emailId) {
            return clickedEmail;
          }
          return email;
        });
      });

      if (clickedEmail) {
        setClickedEmail(clickedEmail);
      }
    } else {
      alert("Email not found. Please click on an email to view details");
    }
  }

  function handleAddFavorite(emailId) {
    const email = emailList.find((email) => email.id === emailId);
    if (email && email.filters.isFavorite === false) {
      setEmailList((prevEmailList) => {
        return prevEmailList.map((email) => {
          if (email.id === emailId) {
            return {
              ...email,
              filters: {
                ...email.filters,
                isFavorite: true,
              },
            };
          }
          return email;
        });
      });
    } else {
      alert("Email already marked as favorite");
    }
  }

  const filteredEmails = emailList.filter((email) => {
    switch (emailFilter) {
      case "unread":
        return !email.filters.isRead;
      case "read":
        return email.filters.isRead;
      case "favorite":
        return email.filters.isFavorite;
      default:
        return true;
    }
  });

  if (isEmailLoading) {
    return (
      <div>
        <h1>Loading Emails...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>{error}</h1>
      </div>
    );
  }

  if (emailList.length === 0) {
    return (
      <div>
        <h1>No Emails Found</h1>
      </div>
    );
  }

  return (
    <>
      <h1>Email App from sarath 😇!</h1>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <EmailFilterWithErrorBoundary />
          <EmailListWithErrorBoundary
            emailList={filteredEmails}
            onEmailClick={handleEmailClick}
          />
        </div>
        {clickedEmail && (
          <EmailBodyWithErrorBoundary
            email={clickedEmail}
            onAddFavorite={handleAddFavorite}
          />
        )}
      </div>
      <EmailPaginationWithErrorBoundary totalEmailItems={totalEmailItems} />
    </>
  );
}
