import html from '../../../index'; // import innerself
import { connect } from '../reducers/store';

import Jumbo from '../components/jumbo';
import Section from '../components/section';
import LinkButton from '../components/button';
import Project from '../components/project';
import Footer from '../components/footer';

function ExamplesPage({ projects }){
	return [
		Jumbo('Examples', true),
		Section({ id: 'featured-project', className: 'dark shallow', content: Project(projects[0]) }),
		Section({ id: 'projects', className: 'white',
			content: projects.slice(1).map(item => Project(item)).join('') }),
		Footer()
	].join('');
}

export default connect(ExamplesPage);
