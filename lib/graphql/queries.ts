import { gql } from '@apollo/client';

export const GET_LOGGED_IN_USER = gql`
  query LoggedInUser {
    loggedInUser {
      email
      firstName
      lastName
      profilePictureUrl
    }
  }
`;

export const GET_CANDIDATES = gql`
  query Query(
    $page: Int!
    $sort: ApplicantListSort
    $pageSize: Int
    $filter: ApplicantListFilter
  ) {
    getCompanyApplicantList(
      page: $page
      sort: $sort
      pageSize: $pageSize
      filter: $filter
    ) {
      pages
      total
      applicants {
        id
        firstName
        lastName
        email
        rating
        profilePhotoUrl
        createdAt
        activeApplication {
          jobListing {
            name
            color
          }
          aiFit
          stage {
            name
            createdAt
          }
          resume {
            url
          }
        }
      }
    }
  }
`;
