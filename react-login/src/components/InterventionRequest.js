// import React from "react";
import { useRef, useState, useEffect } from "react";
// import useAuth from "../Hooks/useAuth";
import axiosPrivate from "../api/axios";
// import useAxiosPrivate from "../Hooks/useAxiosPrivate";

// import { useNavigate } from "react-router-dom";

// import axios from "../api/axios";
const REQUEST_URL = "/interventions/new";

const InterventionRequest = () => {
    // const AUTH = useAxiosPrivate();
    // const navigate = useNavigate();
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState("");
    // const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [setMsg] = useState("");

    useEffect(() => {
        userRef.current.focus();
    }, []);

    //     useEffect(() => {
    //         setErrMsg("");
    //     }, [user, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosPrivate.post(
                REQUEST_URL,
                // {
                    // Authorization: AUTH,
                    //                 // JSON.stringify({ email: user, password: pwd }),
                    //                 {
                    //                     headers: {
                    //                         "Content-Type": "application/json",
                    //                     },
                    //                     withCredentials: true,
                    //                 }
                // }
                );
            const accessToken = response?.data?.accessToken;
            console.log(accessToken);
            //             setAuth({ user, accessToken });
            setUser("");
            setMsg("Your request as been sent");
            //             setPwd("");
            //             navigate("/", { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg("No Server Response");
            } else if (err.response?.status === 403) {
                setErrMsg("Oops! Something went wrong. Error 403");
            } else {
                setErrMsg("Request Failed");
            }
            errRef.current.focus();
        }
    };

    return (
        <section>
            <div className="Auth-form-container">
                <form className="Auth-form" onSubmit={handleSubmit}>
                    {/* <img className="mainLogo" src={mainLogo} alt="Rocket Elevators Logo"></img> */}
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                        {errMsg}
                    </p>
                    <h3 className="Auth-form-title">Intervention Request</h3>
                    <div className="Auth-form-content">
                        <div className="form-group mt-3">
                            <hidden_field
                                // type="integer"
                                id="author"
                                ref={userRef}
                                value={user}
                                className="form-control mt-1"
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="user">Customer</label>
                            <hidden_field
                                // type="email"
                                id="customer_id"
                                // ref={author}
                                // value={customer_id}
                                className="form-control mt-1"
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="user">Building</label>
                            <select_tag
                                type=""
                                id="user"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required
                                className="form-control mt-1"
                                placeholder="Enter email"
                            />
                        </div>
                        {/* <div className="form-group mt-3">
                            <label htmlFor="user">Email address</label>
                            <input
                                type="email"
                                id="user"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required
                                className="form-control mt-1"
                                placeholder="Enter email"
                            />
                        </div> */}
                        {/* <div className="form-group mt-3">
                            <label htmlFor="user">Email address</label>
                            <input
                                type="email"
                                id="user"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required
                                className="form-control mt-1"
                                placeholder="Enter email"
                            />
                        </div> */}
                        {/* <div className="form-group mt-3">
                            <label htmlFor="user">Email address</label>
                            <input
                                type="email"
                                id="user"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required
                                className="form-control mt-1"
                                placeholder="Enter email"
                            />
                        </div> */}
                        {/* <div className="form-group mt-3">
                            <label htmlFor="user">Email address</label>
                            <input
                                type="email"
                                id="user"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required
                                className="form-control mt-1"
                                placeholder="Enter email"
                            />
                        </div> */}
                        {/* <div className="form-group mt-3">
                            <label htmlFor="user">Email address</label>
                            <input
                                type="email"
                                id="user"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required
                                className="form-control mt-1"
                                placeholder="Enter email"
                            />
                        </div> */}
                        {/* <div className="form-group mt-3">
                            <label htmlFor="user">Email address</label>
                            <input
                                type="email"
                                id="user"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required
                                className="form-control mt-1"
                                placeholder="Enter email"
                            />
                        </div> */}
                        {/* <div className="form-group mt-3">
                             <label htmlFor="password">Password</label>
                             <input
                                type="password"
                                id="password"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                                className="form-control mt-1"
                                placeholder="Enter password"
                            />
                        </div> */}
                        <div className="d-grid gap-2 mt-3">
                            <button className="btn btn-primary">Sign in</button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};


// ⇊⇊⇊⇊⇊⇊⇊⇊⇊ RUBY ⇊⇊⇊⇊⇊⇊⇊⇊⇊
// //  Interventions Form
//   <div class="field">
//     <form.label :author/>
//     <form.text_field :authenticate_user_id, class: "formFieldReadOnly", readonly: true />
//   </div>
//   <div class="field">
//     <form.label :customer_id />
//     <form.select(:customer_id, options_for_select(@customer_id)) />
//   </div>
//   <div class="field">
//     <form.label :building_id />
//     <form.select(:building_id, options_for_select(@building_id)) />
//   </div>

//   <div class="row no-gutters wow slideInUp" data-wow-duration="1s">
//     <div class="col-md-12 home-form">
//      <form_tag(building_search_path, method: "get", class: "form-inline", remote: true) do />
//       <div id="author">
//         <form.hidden_field current_user.id, class: "formFieldReadOnly", readonly: true />
//       </div>
//       <div id="step_1">
//         form.label "Step 1 - Select Customer"
//         select_tag :customer_id, options_from_collection_for_select(Customer.all, "id", "id"), :required => true, prompt: "< Select customer>", class: "custom-select mb-0 mr-sm-0 mb-sm-0"
//       </div>
//       <div id="step_2">
//         <form.label "Step 2 - Select Building" />
//         <select_tag :building_id, options_from_collection_for_select(Building.all, "id", "id"), :required => true, prompt: "< Select building >", class: "custom-select mb-0 mr-sm-0 mb-sm-0" /></Select>
//       </div>
//       <div id="step_3">
//         <form.label "Step 3 - Select Battery" />
//         <select_tag :battery_id, options_from_collection_for_select(Battery.all, "id", "id"), :required => true, prompt: "< Select battery >", class: "custom-select mb-0 mr-sm-0 mb-sm-0" />
//       </div>
//       <div id="step_4">
//         <form.label "Step 4 - Select Column" />
//         <select_tag :column_id, options_from_collection_for_select(Column.all, "id", "id"), prompt: "None", class: "custom-select mb-0 mr-sm-0 mb-sm-0" />
//       </div>
//       <div id="step_5">
//         <form.label "Step 5 - Select Elevator" />
//         <select_tag :elevator_id, options_from_collection_for_select(Elevator.all, "id", "id"), prompt: "None", class: "custom-select mb-0 mr-sm-0 mb-sm-0" />
//       </div>
//       <div id="employee">
//         <form.label "Assigned Employee" />
//         <select_tag :employee_id, options_from_collection_for_select(Employee.all, "id", "id"), prompt: "None", class: "custom-select mb-0 mr-sm-0 mb-sm-0" />
//       </div>
//       <div id="intervention_started_at">
//         <hidden_field_tag :intervention_started_at />
//       </div>
//       <div id="intervention_ended_at">
//         <hidden_field_tag :intervention_ended_at />
//       </div>
//       <div id="result">
//         <hidden_field_tag :result />
//       </div>
//       <div id="report">
//         <form.label "Description" />
//         <text_area_tag :report />
//       </div>
//       <div id="status">
//         <hidden_field_tag :status />
//       </div>
//       <div class="actions">
//       <form.submit "Submit", :class => ["btn btn-danger", "fa fa-check"], :method => :post />
//     </div>
//    end
//     </div>
//   </div>

//   <div class="row" id="buildings_listing">
//     <render partial: "buildings_list", locals: {buildings: @buildings} />
//   </div>
//   <div class="field">
//     <form.label :battery_id />
//     <form.number_field :battery_id />
//   </div>
//   <div class="field">
//     <form.label :column_id />
//     <form.number_field :column_id />
//   </div>
//   <div class="field">
//     <form.label :elevator_id />
//     <form.number_field :elevator_id />
//   </div>
//   <div class="field">
//     <form.label :employee_id />
//     <form.number_field :employee_id />
//   </div>
//   <div class="field">
//     <form.label :result />
//     <form.text_field :result />
//   </div>
//   <div class="field">
//     <form.label :report />
//     <form.text_area :report />
//   </div>
  
//   <div class="actions">
//     <form.submit />
//   </div>
//  end 
// ⇈⇈⇈⇈⇈⇈⇈⇈⇈ RUBY ⇈⇈⇈⇈⇈⇈⇈⇈⇈


export default InterventionRequest;
