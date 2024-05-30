import {
    Text,
    SafeAreaView,
    StyleSheet,
    View,
    TextInput,
    Pressable,
    Image,
    ImageBackground,
    ActivityIndicator,
    ScrollView
} from 'react-native';
import React, { useEffect } from 'react';
import { getTop5Players } from '../../utils/scripts/home/Home';
import Environment from '../../utils/constants/Environment';
import { FlatList } from 'react-native-gesture-handler';
import fonts from '../../utils/constants/fonts';
import { SearchBar } from '@rneui/themed';
import AntDesign from '@expo/vector-icons/AntDesign';
import { BackgroundImage } from '@rneui/base';
import colors from '../../utils/constants/colors';
import LinkAccountPopup from '../../components/home/LinkAccountPopup';

const sleep = ms => new Promise(r => setTimeout(r, ms));
const Home = () => {
    const [news, setNews] = React.useState([
        {
            id: 1,
            titulo: 'Smolder, The Fiery Fledling Releases Next Week',
            cuerpo: '{$img:https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Smolder_0.jpg}',
            fecha: '04/02/2024',
            parche: '14.2',
            fondo: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Smolder_0.jpg'
        },
        {
            id: 2,
            titulo: 'Patch Notes of Version 14.9',
            cuerpo: '{$img:https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Smolder_0.jpg}',
            fecha: '06/05/2024',
            parche: '14.9',
            fondo: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltcae83a0aa30a801d/662c40f9c9de4670e8d4ace6/043024_LoL_Patch_14_9_Notes_Banner.jpg?'
        },
        {
            id: 3,
            titulo: 'Smolder, The Fiery Fledling Releases Next Week',
            cuerpo: '{$img:https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Smolder_0.jpg}',
            fecha: '04/02/2024',
            parche: '14.2',
            fondo: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Smolder_0.jpg'
        },
        {
            id: 4,
            titulo: 'Patch Notes of Version 14.9',
            cuerpo: '{$img:https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Smolder_0.jpg}',
            fecha: '06/05/2024',
            parche: '14.9',
            fondo: 'https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltcae83a0aa30a801d/662c40f9c9de4670e8d4ace6/043024_LoL_Patch_14_9_Notes_Banner.jpg?'
        }
    ]);
    function Capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    const [value, setValue] = React.useState("");

    const championWinratestats = require('../../utils/json/MatchesChampionsPerRole.json');
    const [region, setRegion] = React.useState('KR');

    const [regionSearch, setRegionSearch] = React.useState('EUW');
    const [searching, isSearching] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const [resultSearch, setResultSearch] = React.useState(null);
    const [foundChampions, setFoundChampions] = React.useState(null);
    const [championList, setChampionList] = React.useState(null);
    const [summonerList, setSummonerList] = React.useState(null);

    const [foundSummoners, setFoundSummoners] = React.useState(null);
    const [test, setTest] = React.useState(null);
    useEffect(() => {
        async function fetchData() {
            if (search != null && search != undefined && search.length > 0) {
                isSearching(true);
                const URL = `${Environment.RR_API}/searches/champions_summoners?search=${search}&region=${regionSearch}`;
                const response =
                    await fetch(URL, {})
                        .then(response => response.json())
                        .then(data => {
                            // console.log(data);
                            data.champions != null ? setFoundChampions(data.champions) : setFoundChampions(null);
                            data.summoners != null ? setFoundSummoners(data.summoners) : setFoundSummoners(null);
                        })
                        .catch(error => console.log(error));
            } else {
                // console.log('resetting. . .');
                isSearching(false);
                setFoundChampions(null);
                setFoundSummoners(null);
            }
        }
        fetchData();
    }, [search]);
    useEffect(() => {
        // console.log(foundChampions);
        setChampionList(
            <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                <Text style={{ color: colors.text, fontSize: 16, fontFamily: fonts.K2D_B, marginBottom: 10 }}>Champions</Text>
                <FlatList
                    scrollEnabled={false}
                    data={foundChampions}
                    contentContainerStyle={{ gap: 10 }}
                    renderItem={({ item }) => (
                        <View style={{ display: 'flex', flexDirection: 'row', gap: 10, backgroundColor: colors.tertiaryPurple, padding: 10, borderRadius: 7, alignItems: 'center', borderWidth: 1, borderColor: colors.contrast }}>
                            <Image source={{ uri: `https://ddragon.leagueoflegends.com/cdn/14.10.1/img/champion/${Capitalize(item.champion.slug)}.png` }} style={{ width: 34, height: 34, borderRadius: 99, borderWidth: 1, borderColor: colors.contrast }} />
                            <Text style={{ color: colors.text, fontFamily: fonts.K2D_R, fontSize: 16 }}>{Capitalize(item.champion.name)}</Text>
                        </View>
                    )}
                />
            </View>
        );
    }, [foundChampions])
    useEffect(() => {
        // console.log(foundSummoners);
        setSummonerList(
            <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                <Text style={{ color: colors.text, fontSize: 16, fontFamily: fonts.K2D_B, marginBottom: 10 }}>Summoners</Text>
                <FlatList
                    scrollEnabled={false}
                    data={foundSummoners}
                    contentContainerStyle={{ gap: 10 }}
                    renderItem={({ item }) => (
                        <View style={{ display: 'flex', flexDirection: 'row', gap: 10, backgroundColor: colors.tertiaryPurple, padding: 10, borderRadius: 7, alignItems: 'center', borderWidth: 1, borderColor: colors.contrast }}>
                            <Text style={{ color: colors.text, fontFamily: fonts.K2D_R, fontSize: 16 }}>{item.name}</Text>
                        </View>
                    )}
                />
            </View>
        );
    }, [foundSummoners])
    const resultadoChampions = () => {
        return (
            <View>
                <View>
                    <Text style={{ color: colors.text, fontSize: 16, fontFamily: fonts.K2D_B }}>Champions</Text>
                </View>
                <View>
                    {/* {console.log(`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/champion/${foundChampions[0].champion.name}.png`)} */}
                    <FlatList
                        scrollEnabled={false}
                        data={foundChampions}
                        renderItem={({ item }) => (
                            <View>
                                <Image source={{ uri: `https://ddragon.leagueoflegends.com/cdn/14.10.1/img/champion/Nunu.png` }} style={{ width: 22, height: 22 }} />
                                <Text>{item.champion.slug}</Text>
                            </View>
                        )}
                    />
                </View>
            </View>
        )
    }

    const resultadoSummoners = () => {
        <View>
            <View>
                <Text>Summoners</Text>
            </View>
            <View>
                {/* Flatlist */}
            </View>
        </View>
    }
    const [topUsers, setTopUsers] = React.useState(null);
    const [roles, setRoles] = React.useState([
        { role: 'top', key: '1' },
        { role: 'jungle', key: '2' },
        { role: 'mid', key: '3' },
        { role: 'adc', key: '4' },
        { role: 'support', key: '5' }
    ]);
    const [topChampions, setTopChampions] = React.useState(championWinratestats[0]);
    const [activeRole, setActiveRole] = React.useState('jungle');
    const [listedChampions, setListedChampions] = React.useState(activeRole != null || activeRole != undefined ? championWinratestats[0][activeRole] : championWinratestats[0]['top']);

    const roleIcons = {
        // C:\Users\zekro\Desktop\MyApp\MyApp\app\assets\images\icons\roles
        top: require('../../assets/images/icons/roles/top.png'),
        jungle: require('../../assets/images/icons/roles/jungle.png'),
        mid: require('../../assets/images/icons/roles/mid.png'),
        adc: require('../../assets/images/icons/roles/adc.png'),
        support: require('../../assets/images/icons/roles/support.png')
    };

    const trophy = require('../../assets/images/icons/trophy.png');

    const disabledRoleIcons = {
        top: require('../../assets/images/icons/roles/top.png'),
        jungle: require('../../assets/images/icons/roles/jungle.png'),
        mid: require('../../assets/images/icons/roles/mid.png'),
        adc: require('../../assets/images/icons/roles/adc.png'),
        support: require('../../assets/images/icons/roles/support.png')
    }

    const getRoleIconByName = (name) => {
        switch (name) {
            case 'top':
                return roleIcons.top;
            case 'jungle':
                return roleIcons.jungle;
            case 'mid':
                return roleIcons.mid;
            case 'adc':
                return roleIcons.adc;
            case 'support':
                return roleIcons.support;
            default:
                return null;
        }
    }

    /**
     * Asynchronously handles the top users for a given region.
     *
     * @param {string} region - The region to get the top players for.
     * @return {Promise<Object>} A promise that resolves to the response object containing the top players.
     */
    async function handleTopUsers(region) {
        const response = await fetch(`${Environment.RR_API}/summoners/top-players-world?region=${region}`, {}).then(response => response.json()).catch(error => console.log(error));
        return response;
    }

    async function handleActiveRole(activeRole) {
        return championWinratestats[0][activeRole];
    }

    async function handleNews() {
        const response = await fetch("", {}).then(response => response.json()).catch(error => console.log(error));
        return response;
    }

    const parseText = (text) => {
        const parts = text.split(/({\$(?:img|p|t[1-4])}|{\$\/(?:img|p|t[1-4])})/);
        const elements = [];

        parts.forEach((part, index) => {
            if (part.startsWith("{$img:")) {
                const imageUrl = part.substring(6, part.length - 1); // Remove "{$img:" and "}"
                elements.push(<Image key={index} source={{ uri: imageUrl }} />);
            } else if (part.startsWith("{$p}")) {
                const textContent = part.substring(4, part.length - 5); // Remove "{$p}" and "{$/p}"
                elements.push(<Text key={index}>{textContent}</Text>);
            } else if (part.startsWith("{$t")) {
                const fontSize = 32 - (parseInt(part[2]) - 1) * 8; // Calculate font size based on "tX" where X is 1 to 4
                const textContent = part.substring(4, part.length - 5); // Remove "{$tX}" and "{$/tX}"
                elements.push(<Text key={index} style={{ fontSize }}>{textContent}</Text>);
            } else if (part === "{$/img}" || part === "{$/p}" || part === "{$/t1}" || part === "{$/t2}" || part === "{$/t3}" || part === "{$/t4}") {
                // Do nothing, handled the closing tags
            } else {
                elements.push(<Text key={index}>{part}</Text>);
            }
        });

        return elements;
    }


    // Hara que cada vez que cambie la region, se actualice la lista de jugadores
    useEffect(() => {
        handleTopUsers(region).then(users => { setTopUsers(users); });
    }, [region]);

    useEffect(() => {
        handleActiveRole(activeRole).then(topChamps => { setListedChampions(topChamps); });
    }, [activeRole]);

    // useEffect(() => {
    //     handleNews().then(news => { setNews(news); });
    // },[]);

    /**
     * Retrieves and displays the top users based on the provided data.
     *
     * @return {JSX.Element} The JSX element representing the top users list.
     */
    const getTopUsers = () => {

        if (topUsers !== null && topUsers !== undefined) {
            return (
                <FlatList
                    scrollEnabled={false}
                    data={topUsers}
                    contentContainerStyle={{ gap: 10 }}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ flex: 1, color: 'white' }}>{item.id}</Text>
                            <View style={{ flex: 8, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 10 }}>
                                <Image source={{ uri: `https://ddragon.leagueoflegends.com/cdn/14.9.1/img/profileicon/${item.profileIconId}.png` }} style={{ width: 36, height: 36 }} />
                                <Text style={{ color: 'white' }}>{`${item.gameName}#${item.tagLine}`}</Text>
                            </View>
                            <Text style={{ flex: 3, textAlign: 'center', color: 'white' }}>{`${item.wins}/${item.losses}`}</Text>
                            <Text style={{ flex: 3, textAlign: 'center', color: 'white' }}>{item.leaguePoints}</Text>
                        </View>
                    )}
                />
            );
        } else {
            return (
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', minWidth: '100%', backgroundColor: '#252046', flex: 1, borderBottomLeftRadius: 7, borderBottomRightRadius: 7, padding: 10 }}>
                    <View style={{ flex: 1, color: colors.text }}><Text style={{ color: '#E3E3E3', textAlign: 'center' }}>0</Text></View>
                    <View style={{ flex: 6, color: colors.text, marginLeft: 5 }}><Text style={{ color: colors.text }}>N/A</Text></View>
                    <View style={{ flex: 3, color: colors.text }}><Text style={{ color: colors.text, textAlign: 'center' }}>N/A</Text></View>
                    <View style={{ flex: 3, }}><Text style={{ color: colors.text, textAlign: 'center' }}>N/A</Text></View>
                </View>
            );
        }
    }

    const getTopChamps = () => {
        if (activeRole !== null && activeRole !== undefined) {
            return (
                <FlatList
                    scrollEnabled={false}
                    horizontal
                    style={{ flex: 1, minWidth: '100%', minHeight: '100%' }}
                    contentContainerStyle={{ minWidth: '100%', alignItems: 'center', justifyContent: 'space-around' }}
                    data={listedChampions}
                    renderItem={({ item }) => (
                        <View style={{ alignItems: 'center' }}>
                            <Image
                                source={{ uri: `https://ddragon.leagueoflegends.com/cdn/14.9.1/img/champion/${item.id}.png` }}
                                style={{ width: 52, height: 52, borderRadius: 52 / 2, borderWidth: 1, borderColor: 'cyan' }}
                            />
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{
                                    color: 'white',
                                    fontFamily: fonts.K2D_R,
                                    fontSize: 16,
                                }}>{item.name}</Text>
                                <Text style={{
                                    color: 'cyan',
                                    fontFamily: fonts.K2D_B,
                                    fontSize: 16
                                }}
                                >{((item.wins / (item.wins + item.losses)) * 100).toFixed(2)}%</Text>
                                <Text style={{
                                    color: '#8D8D8D',
                                    fontFamily: fonts.K2D_R,
                                    fontSize: 16
                                }}>Win Rate</Text>
                            </View>
                        </View>
                    )}
                />
            );
        }
        return (
            <View>
                <ActivityIndicator size="large" color="#D0D0D0" />
            </View>
        );
    }

    const getNews = () => {
        return (
            <Text>New1</Text>
        )
    }

    function SearchItems() {
        if (search != null && search != undefined && search.length > 0) {
            isSearching(true);
        } else {
            isSearching(false);
        }
    }

    function CloseSearchItems() {
        isSearching(false);
    }

    function handleLinkAccount() {
        console.log('huh');
    }

    const LinkAccountBtn = () => {
        return (
            <View style={styles.linkAccountContainer}>
                <Pressable style={styles.linkAccountBtn} onPress={handleLinkAccount}>
                    <Text style={[styles.text, styles.bold]}>Link League Account</Text>
                </Pressable>
            </View>
        );
    }

    const LinkAccountContainer = () => {
        return (
            <View style={styles.linkAccountPopupContainer}>
                <View style={styles.linkAccountPopup}>
                    <Text style={[styles.text, styles.bold]}>Link your League of Legends Account!</Text>
                    <View>
                        <Text style={styles.text}>1. Enter your Game Name + Tag Line</Text>
                        <Text style={styles.text}>2. Change your Summoner Icon To The Displayed One</Text>
                        <Text style={styles.text}>3. Finish!</Text>
                    </View>
                    <TextInput
                        style={styles.textInput}
                        placeholder='GameName#EUW1'
                    />
                </View>
            </View>
        );
    }

    const formattedText = parseText(`{$img:https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Smolder_0.jpg}`);
    return (
        <ScrollView
            style={{
                backgroundColor: '#1A1635',
                minWidth: '100%',
                minHeight: '100%',
                padding: 20,
            }}
            keyboardDismissMode='on-drag'>
            <View style={{
                minWidth: '100%',
                alignItems: 'center'
            }}>
                <Image
                    src='https://rift-royalty-file-storage.s3.amazonaws.com/RR_LOGO_FULL_NOBLUE.png'
                    style={{ width: 140, height: 140, borderRadius: 70 }} />
                <View style={{
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flex: 1,
                    paddingVertical: 7,
                    paddingHorizontal: 7,
                    borderWidth: 1,
                    borderColor: '#FCEFC6',
                    borderRadius: 7,
                    height: 53
                }}>

                    <AntDesign name="search1" size={32} color="#D3D3D3" />
                    {/* Searchbar */}
                    <TextInput
                        placeholder='Hide On Bush / Ahri...'
                        numberOfLines={1}
                        placeholderTextColor={'#D3D3D3'}
                        style={{ flex: 1, color: '#D3D3D3' }}
                        onChangeText={(text) => { setSearch(text); }}
                        onFocus={() => { SearchItems(); }}
                        onBlur={() => { CloseSearchItems(); }}
                    />
                    <Pressable style={{
                        borderColor: '#FFEFAE',
                        borderRadius: 3,
                        width: 70,
                        borderWidth: 1,
                        backgroundColor: '#595081',
                        paddingVertical: 4,
                        paddingHorizontal: 10,
                    }}>
                        <Text style={{ color: 'white', textAlign: 'center' }}>EUW</Text>
                    </Pressable>
                </View>
                <View style={[{ position: 'absolute', backgroundColor: '#252046', right: 0, left: 0, top: 190, zIndex: 999, borderWidth: 1, borderColor: colors.contrast, borderBottomLeftRadius: 7, borderBottomRightRadius: 7 }, { display: searching == true ? 'flex' : 'none' }]}>
                    <View>
                        {
                            (foundSummoners == null || foundSummoners == undefined) ? <ActivityIndicator size="large" color="#D0D0D0" /> : summonerList
                        }
                        {
                            (foundChampions == null || foundSummoners == undefined) ? <ActivityIndicator size="large" color="#D0D0D0" /> : championList
                        }
                    </View>
                </View>
            </View>
            {LinkAccountBtn()}

            {/** FORM */}
            <View style={{ marginBottom: 15 }}>
                <Text style={{ fontFamily: fonts.AOBOSHI_R, fontSize: 22, color: 'white' }}>Top Players In The Region</Text>
            </View>
            {/* VIEW OF TOP 5 - 1633 - USERS */}

            <View
                style={{
                    display: 'flex',
                    minWidth: '100%',
                    borderWidth: 1,
                    borderColor: '#FCEFC6',
                    borderRadius: 7
                }}>
                <View style={{ display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 10, minWidth: '100%', backgroundColor: '#595081', borderTopLeftRadius: 7, borderTopRightRadius: 7 }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require('../../assets/images/icons/trophy.png')} style={{ width: 22, height: 22 }} />
                    </View>
                    <Text style={{ color: 'white', flex: 6, fontFamily: fonts.K2D_B, marginLeft: 5 }}>Summoner's Name</Text>
                    <Text style={{ color: 'white', flex: 3, textAlign: 'center', fontFamily: fonts.K2D_B }}>Win/Lose</Text>
                    <Text style={{ color: 'white', flex: 3, textAlign: 'center', fontFamily: fonts.K2D_B }}>LP</Text>
                </View>
                {/* ELEMENTO OF TOP USERS */}
                {getTopUsers()}
            </View>

            <Text style={{ fontFamily: fonts.AOBOSHI_R, fontSize: 19, color: 'white', marginVertical: 15 }}>CHAMPIONS <Text style={{ fontFamily: fonts.AOBOSHI_B, color: '#FCEFC6' }}>DOMINATING</Text> THE <Text style={{ fontFamily: fonts.AOBOSHI_B, color: '#FCEFC6' }}>LEADERBOARDS</Text></Text>
            <View>
                <FlatList
                    scrollEnabled={false}
                    data={roles}
                    keyExtractor={(item) => item.key}
                    contentContainerStyle={{ gap: 20 }}
                    renderItem={({ item }) => (
                        <View style={{ borderWidth: 1, borderColor: '#FCEFC6', borderRadius: 7 }}>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#595081', borderWidth: 1, borderTopLeftRadius: 7, borderTopRightRadius: 7, padding: 7, borderBottomColor: '#FCEFC6' }}>
                                <Text style={{ fontSize: 16, textTransform: 'capitalize', textDecorationStyle: 'solid', textDecorationLine: 'underline', color: '#FCEFC6', fontFamily: fonts.K2D_B, }}>Highest Win Rate {item.role}</Text>
                            </View>
                            <View>
                                <FlatList
                                    scrollEnabled={false}
                                    horizontal
                                    style={{ flex: 1 }}
                                    contentContainerStyle={{ minWidth: '100%', alignItems: 'center', justifyContent: 'space-around' }}
                                    data={championWinratestats[0][item.role]}
                                    renderItem={({ item }) => (
                                        <ImageBackground source={{ uri: `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${item.id}_0.jpg` }} style={{ width: 102, height: 153 }}>
                                            <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                <Image
                                                    source={{ uri: `https://ddragon.leagueoflegends.com/cdn/14.9.1/img/champion/${item.id}.png` }}
                                                    style={{ width: 52, height: 52, borderRadius: 52 / 2, borderWidth: 1, borderColor: 'cyan' }}
                                                />
                                                <View style={{ alignItems: 'center' }}>
                                                    <Text style={{ color: '#E2E5FF', fontSize: 16, fontFamily: fonts.AOBOSHI_R }}>{item.name}</Text>
                                                    <Text style={[((item.wins / (item.wins + item.losses)) * 100).toFixed(2) >= 50 ? ((item.wins / (item.wins + item.losses)) * 100).toFixed(2) >= 70 ? { color: 'orange' } : { color: 'cyan' } : { color: 'red' }, { fontFamily: fonts.AOBOSHI_R }]}>{((item.wins / (item.wins + item.losses)) * 100).toFixed(2)}%</Text>
                                                    <Text style={{ color: '#E2E5FF', fontFamily: fonts.AOBOSHI_R }}>Win Rate</Text>
                                                </View>
                                            </View>
                                        </ImageBackground>
                                    )}
                                />
                            </View>
                        </View>
                    )}
                />
            </View>

            {/* NEWS */}
            <Text style={{ fontFamily: fonts.AOBOSHI_R, fontSize: 22, color: colors.text, marginVertical: 15 }}>LATEST <Text style={{ fontFamily: fonts.AOBOSHI_B, color: '#FCEFC6' }}>NEWS</Text></Text>
            <View style={{}}>
                <FlatList
                    style={{ marginBottom: 40 }}
                    scrollEnabled={false}
                    keyExtractor={(item) => item.id}
                    data={news}
                    contentContainerStyle={{ gap: 15 }}
                    renderItem={({ item }) => (
                        <View style={{ backgroundColor: colors.lightPurple, minHeight: 224, borderRadius: 7, borderColor: colors.contrast, borderWidth: 1 }}>
                            <ImageBackground source={{ uri: item.fondo }} style={{ minHeight: 162 }} imageStyle={{ borderRadius: 7 }}>
                                <View style={{ position: 'absolute', bottom: 0, right: 0, display: 'flex', flexDirection: 'row', gap: 10, marginBottom: 7, marginRight: 10 }}>
                                    <Text style={{
                                        backgroundColor: colors.lightPurple,
                                        borderColor: colors.contrast,
                                        borderWidth: 1,
                                        paddingHorizontal: 10,
                                        paddingVertical: 1,
                                        borderRadius: 3,
                                        color: 'white',
                                        fontFamily: fonts.K2D_B,
                                        fontSize: 12,
                                    }}>Patch {item.parche}</Text>
                                    <Text style={{
                                        backgroundColor: colors.lightPurple,
                                        borderColor: colors.contrast,
                                        borderWidth: 1,
                                        paddingHorizontal: 10,
                                        paddingVertical: 1,
                                        borderRadius: 3,
                                        color: 'white',
                                        fontFamily: fonts.K2D_B,
                                        fontSize: 12,
                                    }}>{item.fecha}</Text>
                                </View>
                            </ImageBackground>
                            <View style={{ minHeight: 63, paddingHorizontal: 15, paddingVertical: 5, borderTopWidth: 1, borderTopColor: colors.contrast }}>
                                <Text style={{ color: 'white', fontSize: 16, fontFamily: fonts.K2D_B }}>{item.titulo}</Text>
                            </View>
                        </View>
                    )}
                />
            </View>
            <LinkAccountPopup/>
        </ScrollView>
    )
}

export default Home

const styles = StyleSheet.create({
    linkAccountPopupContainer: {
        minWidth: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 247,
        position: 'absolute',
        top: 200
    },
    linkAccountPopup: {
        backgroundColor: colors.bgPurple,
        minHeight: 247,
        minWidth: 340,
        borderRadius: 7,
        borderColor: colors.contrast,
        borderWidth: 1,
        paddingHorizontal: 22
    },
    linkAccountContainer: {
        minWidth: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 30,
    },
    linkAccountBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.fillContrast,
        padding: 10,
        borderRadius: 7,
        minWidth: '70%',
    },
    text: {
        fontSize: 16,
        fontFamily: fonts.K2D_R,
        color: 'white',
    },
    bold: {
        fontFamily: fonts.K2D_B
    }
})