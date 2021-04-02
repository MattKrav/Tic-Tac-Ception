import { useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid';

import BigBoard from '../components/bigBoard/BigBoard';
import BoardControls from '../components/boardControls/BoardControls'

function App() {

	const { currentTurn, gameOver, gameWinner } = useSelector(state => state.game)

	return (
		<div className="board">
			<Grid container spacing={1}>
				<Grid item xs={12}>
					<BigBoard />
				</Grid>
				<Grid item xs={12}>
					<BoardControls
						isGameOver={gameOver}
						currentTurn={currentTurn}
						gameWinner={gameWinner} />
				</Grid>
			</Grid>
		</div>
	);
}

export default App;
