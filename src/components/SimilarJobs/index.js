import {BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const SimilarJobs = props => {
  const {similar} = props
  const {
    companyLogoUrl,

    jobDescription,
    employmentType,
    location,
    rating,
    title,
  } = similar
  return (
    <li className="similar-jobs-li-container">
      <div className="similar-jobs-container">
        <img
          className="similar-jobs-image"
          src={companyLogoUrl}
          alt="similar job company logo"
        />
        <div className="similar-jobs-heading-container">
          <h1 className="similar-jobs-heading-title">{title}</h1>
          <p>
            <AiFillStar className="star-color" />
            {rating}
          </p>
        </div>
      </div>

      <h1 className="similar-head">Description</h1>
      <p className="similar-desc">{jobDescription}</p>
      <div className="similar-bottom-container">
        <div className="a">
          <p className="sam">
            <MdLocationOn className="bb" />
            {location}
          </p>
        </div>
        <div className="a">
          <p className="sam">
            <BsBriefcaseFill className="bb " />
            {employmentType}
          </p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
