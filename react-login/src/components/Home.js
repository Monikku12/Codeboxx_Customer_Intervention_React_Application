import InterventionsTable from "./InterventionsTable";


const Home = () => {
  return (
    <section>
      <h1>Home Page</h1>
      <br />
      <p>The interventions will be displayed here.</p>
      <br />
      <InterventionsTable />
      <br />
      {/* <div className="d-grid gap-2 mt-3">
        <button className="btn btn-primary">
          Log out
        </button>
      </div> */}
    </section>
  )
}

export default Home