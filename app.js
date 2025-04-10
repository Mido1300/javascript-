// Components
const Header = () => (
    <header className="header">
        <h1>React Training Program</h1>
        <p>Transforming JS Developers into React Experts</p>
    </header>
);

const PhaseCard = ({ title, duration, children }) => (
    <div className="phase-card">
        <h2>{title}</h2>
        <p>{duration}</p>
        <div>{children}</div>
    </div>
);

const AssessmentDemo = () => {
    const [input, setInput] = React.useState('');
    const [result, setResult] = React.useState(null);

    const transformData = (data) => {
        const { name, values } = data;
        return `${name}: ${values.map(v => v * 2).join(', ')}`;
    };

    const fetchData = async () => {
        try {
            const response = await new Promise(resolve => 
                setTimeout(() => resolve({ data: [1, 2, 3, 4] }), 1000)
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSubmit = async () => {
        const data = { name: input, values: [1, 2, 3] };
        const transformed = transformData(data);
        const fetched = await fetchData();
        setResult({
            transformed,
            fetched: fetched.join(', '),
            destructured: `First: ${fetched[0]}, Rest: ${fetched.slice(1).join(', ')}`
        });
    };

    return (
        <div className="assessment">
            <h3>Day 1 Assessment Demo</h3>
            <div>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter name for transformation"
                    className="input"
                />
                <button
                    onClick={handleSubmit}
                    className="button"
                >
                    Run Assessment
                </button>
                {result && (
                    <div className="result">
                        <p><strong>Transformed:</strong> {result.transformed}</p>
                        <p><strong>Fetched Data:</strong> {result.fetched}</p>
                        <p><strong>Destructuring:</strong> {result.destructured}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

// Main App Component
const App = () => (
    <div className="container">
        <Header />
        <main>
            <section>
                <h2>Program Overview</h2>
                <p>
                    This intensive React training program transforms developers with JavaScript knowledge into proficient React developers through structured, hands-on learning.
                </p>
                <p>Duration: 2-3 weeks (40+ hours per week, full-time)</p>
            </section>

            <section>
                <h2>Program Schedule</h2>
                <PhaseCard title="Phase 1: Foundation" duration="Week 1: Days 1-3">
                    <ul>
                        <li>Modern JavaScript Essentials (ES6+)</li>
                        <li>Arrow functions, destructuring, promises, async/await</li>
                        <li>Assessment: JavaScript fundamentals (2 hours)</li>
                    </ul>
                    <AssessmentDemo />
                </PhaseCard>

                <PhaseCard title="Phase 2: Application Development" duration="Week 1: Day 4 - Week 2: Day 3">
                    <ul>
                        <li>Building React components</li>
                        <li>State management</li>
                        <li>Routing and API integration</li>
                    </ul>
                </PhaseCard>

                <PhaseCard title="Phase 3: Advanced Concepts & Final Project" duration="Week 2: Day 4 - Week 3">
                    <ul>
                        <li>React hooks and context</li>
                        <li>Performance optimization</li>
                        <li>Final project development and presentation</li>
                    </ul>
                </PhaseCard>
            </section>
        </main>
    </div>
);

// Render the app
ReactDOM.render(<App />, document.getElementById('root'));