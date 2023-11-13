import { useState, useEffect } from 'react'
import axios from 'axios'

export const Form = () => {
  const [testingData, setTestingData] = useState([])

  const getCookie = name => {
    let cookieValue = null
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';')
      for (let i = 0; i < cookies.length; i += 1) {
        const cookie = cookies[i].trim()
        if (cookie.substring(0, name.length + 1) === `${name}=`) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
          break
        }
      }
    }
    return cookieValue
  }

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/', {
        params: { pk: 'abc' },
      })
      .then(response => response)
      .then(data => {
        setTestingData(data.data.test)
      })
      .catch(err => {
        console.log(err.message)
      })
  }, [])

  function submit() {
    // axios.post(
    //   'http://localhost:8000/post/',
    //   JSON.stringify({"aaa": "bbb"}),
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       "X-CSRFToken": getCookie('csrftoken'),
    //     },
    //     credentials: "include",
    //   }
    // )
    // .then((response) => console.log(response))
    // .catch((err) => console.log(err))

    fetch('http://localhost:8000/post/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookie('csrftoken'),
      },
      credentials: 'include',
      body: JSON.stringify({ aaa: 'bbb' }),
    })
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className="otree-body container">
      <button type="submit" className="FooterRegisterForm__registerButton" onClick={submit}>
        submit
      </button>
      <h2 className="otree-title page-header">Survey</h2>
      <form className="otree-form" method="post" id="form" autoComplete="off">
        <input
          type="hidden"
          name="csrfmiddlewaretoken"
          value="XrBNGM0QHb1P0dLEcfI6CvA1kS0W00m4lCGX2TyZ5pw9QgVqQmVUh67lbtpEdcLs"
        />
        <div className="_otree-content">
          <p>Please answer the following questions.</p>

          <p>{testingData}</p>

          <div className="form-group required">
            <label className="col-form-label" htmlFor="id_age">
              What is your age?
              <div className="controls  field-age">
                <input type="number" name="age" min="13" max="125" required id="id_age" className="form-control" />
              </div>
            </label>
          </div>
          <p>
            <button className="otree-btn-next btn btn-primary" type="button">
              Next
            </button>
          </p>
        </div>
      </form>
    </div>
  )
}
