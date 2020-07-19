import * as React from 'react';
import { Link } from 'react-router-dom';

interface FooterGroup {
  name: string;
  links: FooterLink[];
}

interface FooterLink {
  title: string;
  url: string;
  icon: string;
}

const Footer: React.StatelessComponent = () => {
  const footerData: FooterGroup[] = [
    {
      name: '5 Calls',
      links: [
        { title: 'About Us', url: '/about-us/', icon: 'heart' },
        {
          title: 'Why Calling Works',
          url: '/why-calling-works/',
          icon: 'phone-alt'
        },
        {
          title: 'Topic Archives',
          url: 'https://5calls.org/archives/',
          icon: 'archive'
        },
        { title: 'Privacy', url: 'https://5calls.org/privacy', icon: 'eye' }
      ]
    },
    {
      name: 'Support',
      links: [
        {
          title: 'Getting Started',
          url: '/getting-started/',
          icon: 'info-circle'
        }
      ]
    }
  ];

  return (
    <div className="footer">
      <div className="content">
        <div className="footer-about">
          <p>
            <strong>© 2020 5 Calls Civic Action</strong>
          </p>
          <p>
            We are a 501(c)(4) non-profit that helps citizens make their voices
            heard.
          </p>
        </div>
        <div className="g g-4up">
          {footerData.map(group => {
            return (
              <div>
                <h4>{group.name}</h4>
                <ul>
                  {group.links.map(link => {
                    return (
                      <li>
                        <i className={`fa fa-fw fa-${link.icon}`} />{' '}
                        <Link to={link.url}>{link.title}</Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Footer;
