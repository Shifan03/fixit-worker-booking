import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import work1 from './images/work1.png'
import work2 from './images/work2.png'
import work3 from './images/work3.png'
import work4 from './images/work4.png'
import work5 from './images/work5.png'
import work6 from './images/work6.png'
import work7 from './images/work7.png'
import work8 from './images/work8.png'
import work9 from './images/work9.png'
import work10 from './images/work10.png'
import work11 from './images/work11.png'
import work12 from './images/work12.png'
import work13 from './images/work13.png'
import work14 from './images/work14.png'
import work15 from './images/work15.png'
import Cleaning from './icons/Cleaning.svg'
import Electrician from './icons/Electrician.svg'
import Painter from './icons/Painter.svg'
import Plumber from './icons/Plumber.svg'
import Repairing from './icons/Repairing.svg'
import Transportation from './icons/Transportation.svg'


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}

export const serviceCategories = [
    { category: 'Cleaning',      image: Cleaning },
    { category: 'Electrician',   image: Electrician },
    { category: 'Painter',       image: Painter },
    { category: 'Plumber',       image: Plumber },
    { category: 'Repairing',     image: Repairing },
    { category: 'Transportation', image: Transportation }
];

export const workers = [
    {
        _id: 'work1',
        name: 'John Smith',
        image: work1,
        category: 'Cleaning',
        hourlyRate: 25,
        experience: '3 Years',
        about: 'Experienced cleaner with attention to detail.',
        address: {
            line1: '123 Main St',
            line2: 'City Center'
        }
    },
    {
        _id: 'work2',
        name: 'Michael Johnson',
        image: work2,
        category: 'Electrician',
        hourlyRate: 30,
        experience: '5 Years',
        about: 'Professional electrician specializing in residential wiring.',
        address: {
            line1: '456 Electrical Rd',
            line2: 'Electrical Service Area'
        }
    },
    {
        _id: 'work3',
        name: 'Alice Williams',
        image: work3,
        category: 'Painter',
        hourlyRate: 28,
        experience: '4 Years',
        about: 'Interior and exterior painting expert.',
        address: {
            line1: '789 Paint Ave',
            line2: 'Color Town'
        }
    },
    {
        _id: 'work4',
        name: 'Robert Brown',
        image: work4,
        category: 'Plumber',
        hourlyRate: 35,
        experience: '6 Years',
        about: 'Reliable plumber for homes and offices.',
        address: {
            line1: '321 Pipe Blvd',
            line2: 'Plumbing Zone'
        }
    },
    {
        _id: 'work5',
        name: 'Emily Davis',
        image: work5,
        category: 'Repairing',
        hourlyRate: 22,
        experience: '2 Years',
        about: 'Appliance and small device repairs.',
        address: {
            line1: '654 Fixit St',
            line2: 'Repair Hub'
        }
    },
    {
        _id: 'work6',
        name: 'William Martinez',
        image: work6,
        category: 'Transportation',
        hourlyRate: 20,
        experience: '5 Years',
        about: 'Safe and punctual driver for local transport.',
        address: {
            line1: '147 Transit Way',
            line2: 'Transport Nagar'
        }
    },
    {
        _id: 'work7',
        name: 'Linda Rodriguez',
        image: work7,
        category: 'Cleaning',
        hourlyRate: 26,
        experience: '3 Years',
        about: 'Expert in deep home cleaning.',
        address: {
            line1: '852 Sparkle Ln',
            line2: 'Cleanville'
        }
    },
    {
        _id: 'work8',
        name: 'James Wilson',
        image: work8,
        category: 'Electrician',
        hourlyRate: 32,
        experience: '7 Years',
        about: 'Certified electrician for industrial projects.',
        address: {
            line1: '963 Volt Rd',
            line2: 'Current City'
        }
    },
    {
        _id: 'work9',
        name: 'Barbara Anderson',
        image: work9,
        category: 'Painter',
        hourlyRate: 27,
        experience: '4 Years',
        about: 'Creative wall painter with fine finish skills.',
        address: {
            line1: '741 Canvas St',
            line2: 'Artisan Block'
        }
    },
    {
        _id: 'work10',
        name: 'Charles Thomas',
        image: work10,
        category: 'Plumber',
        hourlyRate: 36,
        experience: '6 Years',
        about: 'Emergency plumbing expert.',
        address: {
            line1: '258 Leak Ave',
            line2: 'Pipe Sector'
        }
    },
    {
        _id: 'work11',
        name: 'Susan Taylor',
        image: work11,
        category: 'Repairing',
        hourlyRate: 24,
        experience: '3 Years',
        about: 'Repairs electronics and small gadgets.',
        address: {
            line1: '159 Restore Ln',
            line2: 'Gadget Town'
        }
    },
    {
        _id: 'work12',
        name: 'Christopher Moore',
        image: work12,
        category: 'Transportation',
        hourlyRate: 21,
        experience: '5 Years',
        about: 'Skilled in city and highway logistics.',
        address: {
            line1: '753 Move St',
            line2: 'Freight Zone'
        }
    },
    {
        _id: 'work13',
        name: 'Patricia Jackson',
        image: work13,
        category: 'Cleaning',
        hourlyRate: 29,
        experience: '4 Years',
        about: 'Green cleaning specialist for eco homes.',
        address: {
            line1: '864 Fresh Blvd',
            line2: 'Eco Neighborhood'
        }
    },
    {
        _id: 'work14',
        name: 'Daniel White',
        image: work14,
        category: 'Electrician',
        hourlyRate: 31,
        experience: '6 Years',
        about: 'Smart home wiring and setup expert.',
        address: {
            line1: '198 Fuse St',
            line2: 'Tech Park'
        }
    },
    {
        _id: 'work15',
        name: 'Jennifer Harris',
        image: work15,
        category: 'Painter',
        hourlyRate: 30,
        experience: '5 Years',
        about: 'Artistic touch with precision painting.',
        address: {
            line1: '675 Brush Ln',
            line2: 'Creative Quarters'
        }
    }
];
