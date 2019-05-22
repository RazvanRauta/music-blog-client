/*
 * @author: Razvan Rauta
 * Date: 22.05.2019
 * Time: 11:12
*/

export const parseApiErrors = (error) => {
    return error.response.body.violations.reduce(
        (parsedErrors, violation) => {
            parsedErrors[violation['propertyPath']] = violation['message'];
            return parsedErrors;
        },
        {}
    );
};

export const hydraPageCount = (collection) => {
    if (!collection['hydra:view']) {
        return 1;
    }

    return Number(
        collection['hydra:view']['hydra:last'].match(/page=(\d+)/)[1]
    )
};

const canAddSongs = ['ROLE_SUPERADMIN', 'ROLE_ADMIN'];

export const canAddSong = (userData) => {
    return null !== userData
        && userData.roles.some(
            userRoles => canAddSongs.includes(userRoles)
        );
};