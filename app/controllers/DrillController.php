<?php

class DrillController extends BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		if ( isset($_GET['tag']) ) {
			$query= DB::table('drills')
								->where('position_id', '=', $_GET['tag'])
								->join('positions', 'drills.position_id', '=', 'positions.id')
								->take(20)
								->get(array('drills.id', 'drills.title', 'drills.video', 'positions.label'));
		} else {
			$query= DB::table('drills')
									->orderBy('updated_at', 'desc')
									->join('positions', 'drills.position_id', '=', 'positions.id')
									->take(20)
									->get(array('drills.id', 'drills.title', 'drills.video', 'positions.label'));
		}
		return json_encode($query);
		//return ;
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		//
	}

	/**
	 * Display the specified resource.
	 *
	 * @return Response
	 */
	public function show($id) {
		$query= DB::table('drills')
								->where('drills.id', '=', $id)
								->join('positions', 'drills.position_id', '=', 'positions.id')
								->get(array('drills.*', 'positions.label', 'positions.full_name'));
		return Response::json($query[0]);
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @return Response
	 */
	public function update($id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}

}