import { useNavigate } from "react-router-dom"

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <>
      <div className="container">
        <section>
              <h1>Unauthorized</h1>
              <br />
              <p>You do not have access to the requested page.</p>
              <div>
                  <button className="btn-link" onClick={goBack}>Go Back</button>
              </div>
          </section>
      </div>
    </>
  )
}

export default Unauthorized;