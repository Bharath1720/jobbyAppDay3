import Cookies from 'js-cookie'

import {Component} from 'react'
import './index.css'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import JobItemDetailsRoute from '../JobItemDetailsRoute'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class JobsRoute extends Component {
  state = {
    profileDetails: {},
    jobsDetails: [],
    checkboxInput: [],
    radioInput: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getProfileData()
    this.getJobData()
  }

  getProfileData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
      })
    }
  }

  getJobData = async () => {
    const {checkboxInput, radioInput, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const jobApiUrl = `https://apis.ccbp.in/jobs?employment_type=${checkboxInput}&minimum_package=${radioInput}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedJobData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobsDetails: updatedJobData,
      })
    }
  }

  checkBoxOption = event => {
    const {checkboxInput} = this.state
    let updated = [...checkboxInput]
    if (event.target.checked) {
      updated = [...checkboxInput, event.target.id]
    } else {
      updated.splice(checkboxInput.indexOf(event.target.value), 1)
    }
    this.setState(
      {
        checkboxInput: updated,
      },
      this.getJobData,
    )
  }

  radioOption = event => {
    this.setState({
      radioInput: event.target.id,
    })
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onEnterClicked = event => {
    if (event.key === 'Enter') {
      this.getJobData()
    }
  }

  renderProfileDisplay = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-display-container">
        <img className="profile-logo" src={profileImageUrl} alt="" />
        <p className="profile-name">{name}</p>
        <p className="profile-description">{shortBio}</p>
      </div>
    )
  }

  renderTypesOfEmployement = () => (
    <>
      <ul className="types-of-employment">
        <h3 className="types-heading">Type of Employment</h3>
        {employmentTypesList.map(each => (
          <li className="li-types-of-employment" key={each.employmentTypeId}>
            <input
              className="checkbox-style"
              type="checkbox"
              id={each.employmentTypeId}
              onChange={this.checkBoxOption}
            />
            <label htmlFor={each.employmentTypeId}>{each.label}</label>
          </li>
        ))}
      </ul>
      <hr className="hr-line" />
    </>
  )

  renderSalaryRange = () => (
    <>
      <ul className="types-of-employment">
        <h3 className="types-heading">Salary Range</h3>
        {salaryRangesList.map(each => (
          <li className="li-types-of-employment" key={each.salaryRangeId}>
            <input
              className="checkbox-style"
              type="radio"
              id={each.salaryRangeId}
              name="salary"
              onChange={this.radioOption}
            />
            <label htmlFor={each.salaryRangeId}>{each.label}</label>
          </li>
        ))}
      </ul>
      <hr className="hr-line" />
    </>
  )

  render() {
    const {checkboxInput, radioInput, searchInput, jobsDetails} = this.state
    return (
      <>
        <Header />
        <div className="jobs-bg-container">
          <div className="profile-container">
            {this.renderProfileDisplay()}
            {this.renderTypesOfEmployement()}
            {this.renderSalaryRange()}
          </div>
          <div className="job-details-container">
            <div className="search-container">
              <input
                className="search-bar"
                type="search"
                value={searchInput}
                onChange={this.onChangeSearchInput}
                onKeyDown={this.onEnterClicked}
              />
              <button className="btn-si" type="button" testid="searchButton">
                <BsSearch className="search-icon" />
              </button>
            </div>
            <ul>
              {jobsDetails.map(each => (
                <JobItemDetailsRoute key={each.id} jobData={each} />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }
}
export default JobsRoute
