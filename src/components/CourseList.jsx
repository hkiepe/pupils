// react imports
import { useState, useEffect, useContext } from "react";

// firebase imports
import { db } from "../firebase-config";
import { getDocs, collection } from "firebase/firestore";

// context
import AuthContext from "../context/auth-context";

// library imports
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import PaypalCheckoutButton from "./PaypalCheckoutButton";

// Paypal Imports
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

// Video player
import { Player } from "video-react";

const CourseList = () => {
  const [courseList, setCourseList] = useState([]);
  const context = useContext(AuthContext);
  const purchasedCourses = context.loggedInUser.userData.purchasedCourses;

  const courseCollectionRef = collection(db, "courses");

  const getCourseList = async () => {
    try {
      const data = await getDocs(courseCollectionRef);
      const courseData = data.docs.map((course) => {
        console.log("course.data()", course.data());
        return { ...course.data(), id: course.id };
      });
      setCourseList(courseData);
    } catch (error) {
      console.log("Hello");
      throw new Error("There was a problem fetching the movies from database");
    }
  };

  useEffect(() => {
    getCourseList();
  }, []);

  return (
    <div>
      <h2 className="h3">Course List</h2>
      {courseList &&
        courseList.map((course) => {
          return (
            <div className="form-wrapper">
              <h3>Title: {course.courseName}</h3>
              <p>{course.courseDescription}</p>
              <p><b>Price:</b> {course.coursePrice} EUR</p>
              <iframe
                width="560"
                height="315"
                src={course.courseTrailerUrl}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
              <PaypalCheckoutButton course={course} />
            </div>
          );
        })}
    </div>
  );
};

export default CourseList;
