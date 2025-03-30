import { gql } from '@apollo/client';

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
