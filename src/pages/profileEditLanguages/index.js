// import {API_URL, SERVER_URL} from "../../config";
// import {EditModule} from "../../Components/ProfileEdit/EditModule";
// import {useEffect, useState} from "react";
// import {useParams} from "react-router-dom";
// import profileService from "../../services/profileService";
// import close_icon_red from '../../assets/icons/close_icon_red.png'
// import authAxios from "../../services/authAxios";
// import {PersonalInfo} from "../../Components/ProfileEdit/PersonalInfo";
//
// export const ProfileEditLanguages = () => {
//
//     const {id} = useParams();
//     const [languages, setLanguages] = useState([]);
//
//
//     useEffect(() => {
//         return () => {
//             getLanguages();
//         };
//     }, []);
//
//
//     const getLanguages = () => {
//         profileService.getLanguages('1')
//             .then(response => {
//                 if (response.status === 200) {
//                     console.log(response.data)
//                     setLanguages(response.data['hydra:member']);
//                 }
//             }).catch(err => {
//
//             console.log(err);
//         });
//     }
//
//     // const onClickDelete = (technology) => {
//     //     authAxios.delete(API_URL + '/users/' + '1' + '/languages/' + technology.id).then((data) => {
//     //         let newTechnologies = [...technologies];
//     //         let index = newTechnologies.indexOf(technology)
//     //         newTechnologies.splice(index, 1);
//     //         setTechnologies(newTechnologies)
//     //     }).catch((e) => {
//     //         console.log(e);
//     //     });
//     // }
//
//     if (languages) {
//
//         return (
//             <div className={"profile-container "}>
//                 <PersonalInfo personalData={personalData}/>
//
//                 <EditModule
//                     title={"Technologie"}
//                     lastCol={'8'}
//                     class={"mb-52"}
//                 >
//                     <div className={" gap-5  mt-5 flex-wrap mb-12"}>
//                         {technologies ? technologies.map(technology => {
//                             return (
//                                 <div className={" pt-2 flex flex-row justify-between"}
//                                      style={{borderBottom: "1px solid rgb(15,82,139, 0.4)"}}
//                                      key={technology['@id']}>
//                                     <p className={"text-xl"}>{technology.name}</p>
//                                     <img src={close_icon_red} className={"cursor-pointer"} alt={"delete"} width={28}
//                                          height={8}
//                                          onClick={() => onClickDelete(technology)}/>
//                                 </div>
//
//                             )
//                         }) : null}
//
//                     </div>
//
//                 </EditModule>
//
//             </div>
//
//
//         );
//     } else {
//         return null;
//     }
// }