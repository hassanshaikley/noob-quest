defmodule StabbyFlies.PlayerSupervisorTest do
  use ExUnit.Case, async: false
  alias StabbyFlies.PlayerSupervisor

  setup do
    reset
    []
  end

  test "initialization" do
    PlayerSupervisor.create_player(name: "Farticus", socket_id: "Farticus", nickname: "Farticus")

    player_two =
      PlayerSupervisor.create_player(
        name: "Farticus-Deux",
        socket_id: "Farticus-Deux",
        nickname: "Farticus-Deux"
      )

    assert PlayerSupervisor.players() |> length == 2
    assert PlayerSupervisor.players() |> Enum.at(1) |> Map.get(:name) == player_two |> elem(1)
  end

  test "deletion" do
    PlayerSupervisor.create_player(
      name: "Farticus-Prime",
      socket_id: "Farticus-Prime",
      nickname: "Farticus"
    )

    PlayerSupervisor.delete_player("Farticus-Prime")

    assert PlayerSupervisor.players() |> length == 0
  end

  defp reset do
    PlayerSupervisor.reset()
  end
end
