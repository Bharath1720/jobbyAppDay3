import {Component} from 'react'
import Cookies from 'js-cookie'
import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import {BiLinkExternal} from 'react-icons/bi'
import {BsBriefcaseFill} from 'react-icons/bs'
//  import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AboutJobItem extends Component {
  state = {
    jobItemData: [],
    similarJobsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobItemData()
  }

  // eslint-disable-next-line no-unused-vars
  getJobItemData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const jobItemApiUrl = `https://apis.ccbp.in/jobs/${id}`
    const optionsJobItemData = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const responseJobItemData = await fetch(jobItemApiUrl, optionsJobItemData)
    if (responseJobItemData.ok === true) {
      const fetchedJobItemData = await responseJobItemData.json()
      const updatedJobItemData = [fetchedJobItemData.job_details].map(each => ({
        companyLogoUrl: each.company_logo_url,
        companyWebsiteUrl: each.company_website_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        lifeAtCompany: {
          description: each.life_at_company.description,
          imageUrl: each.life_at_company.image_url,
        },
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        skills: each.skills.map(skills => ({
          imageUrl: skills.image_url,
          name: skills.name,
        })),
        title: each.title,
      }))

      const updatedSimilarJobsData = fetchedJobItemData.similar_jobs.map(
        each => ({
          companyLogoUrl: each.company_logo_url,
          id: each.id,
          jobDescription: each.job_description,
          employmentType: each.employment_type,
          location: each.location,
          rating: each.rating,
          title: each.title,
        }),
      )
      this.setState({
        jobItemData: updatedJobItemData,
        similarJobsData: updatedSimilarJobsData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderJobDetailsSuccessView = () => {
    const {jobItemData, similarJobsData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
    } = jobItemData[0]
    return (
      <>
        <div className="about-job-items-container">
          <div className="job-item-details-main">
            <div className="job-item-header">
              <img className="job-title-logo" src={companyLogoUrl} alt={id} />
              <div className="title-rating-container">
                <h1 className="job-title-heading">{title}</h1>
                <div className="rating-star-container">
                  <AiFillStar className="rating-icon" />
                  <span>{rating}</span>
                </div>
              </div>
            </div>
            <div className="about-location-package-container">
              <div className="location-package-left">
                <MdLocationOn className="location-icon" />
                <p className="location">{location}</p>
                <BsBriefcaseFill className="bag-icon" />
                <p>{employmentType}</p>
              </div>
              <p className="annual-package">{packagePerAnnum}</p>
            </div>
            <hr className="hr-job-line" />
            <div className="about-description-container">
              <h1 className=" about-job-description-heading ">Description</h1>
              <a
                className="visit-anchor-text"
                href={companyWebsiteUrl}
                target="_blank"
                rel="noreferrer"
              >
                Visit <BiLinkExternal className="visit-color" />
              </a>
            </div>
            <p className="about-job-item-description-text">{jobDescription}</p>
            <h1 className="skills-heading">Skills</h1>
            <ul className="ul-job-item-details-container">
              {skills.map(eachItem => (
                <li
                  className="li-job-item-details-container"
                  key={eachItem.name}
                >
                  <img
                    className="skill-image"
                    src={eachItem.imageUrl}
                    alt={eachItem.name}
                  />
                  <p className="skill-text">{eachItem.name}</p>
                </li>
              ))}
            </ul>
            <div className="life-at-company-container">
              <div className="life-at-company-container-heading-container">
                <h1 className="life-at-company-container-heading">
                  Life at Company
                </h1>
                <p className="life-at-company-container-description">
                  {lifeAtCompany.description}
                </p>
              </div>
              <img
                className="life-at-company-image"
                src={lifeAtCompany.imageUrl}
                alt="life at company"
              />
            </div>
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-ul-container">
          {similarJobsData.map(eachItem => (
            <SimilarJobs key={eachItem.id} similar={eachItem} />
          ))}
        </ul>
      </>
    )
  }

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-items-details-view-container">
          {this.renderJobDetails()}
        </div>
      </>
    )
  }
}

export default AboutJobItem
